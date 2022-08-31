import invariant from 'tiny-invariant';

export type CityType = {
  id: string;
  name: string;
  lat: string;
  lon: string;
};

export type DailyForecastType = {
  date: Date;
  description: string;
  temperature: number;
};

export type OpenWeatherMapFiveDayForecastType = any;

export const fetchWeatherForecast = async (
  city: CityType
): Promise<OpenWeatherMapFiveDayForecastType> => {
  const weatherRequestEndpoint = process.env.WEATHER_API_URL;
  invariant(weatherRequestEndpoint, 'Weather API request URL not defined');
  const weatherRequestApiKey = process.env.WEATHER_API_KEY;
  invariant(weatherRequestApiKey, 'Weather API key not defined');

  const weatherRequestParams = new URLSearchParams({
    lat: city.lat,
    lon: city.lon,
    units: 'metric',
    appid: weatherRequestApiKey,
  });

  const weatherRes = await fetch(`${weatherRequestEndpoint}?${weatherRequestParams.toString()}`);

  return weatherRes.json();
};

export const getFiveDayForecast = (
  fiveDayForecast: OpenWeatherMapFiveDayForecastType[]
): DailyForecastType[] => {
  const forecastObject: Record<string, DailyForecastType> = fiveDayForecast.reduce(
    (prev: any, curr: any) => {
      const currentDate = new Date(curr.dt_txt.substr(0, 10)).toLocaleDateString();

      const currentTempIsHigher = prev[currentDate]?.temperature < curr.main.temp_max;
      const dateNotInitialized = !prev[currentDate];

      // insert the forecase if nothing exists for the day or its max is higher than the existing forecast for the day
      if (dateNotInitialized || currentTempIsHigher) {
        prev[currentDate] = {
          date: curr.dt_txt,
          description: curr.weather[0]?.main,
          temperature: curr?.main.temp_max.toFixed(0),
        };
      }

      return prev;
    },
    {}
  );

  // forecase array should come in sorted, but we'll sort again here for safety
  return Object.values(forecastObject).sort(
    (forecastA, forecastB) =>
      new Date(forecastA.date).getTime() - new Date(forecastB.date).getTime()
  );
};
