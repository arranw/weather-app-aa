import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';
import { CityLink } from '~/components/CityLink';
import { WeatherCard, WeatherContainer } from '~/components/WeatherCard';

type City = {
  id: string;
  name: string;
  lat: string;
  long: string;
};

interface LoaderData {
  cities: City[];
  weatherData: any;
}

const getDailyMaxes = (dailyMaxes: []): Record<string, { dt_txt: string; dailyMax: any }> => {
  return dailyMaxes?.reduce((prev: any, curr: any) => {
    const currentDate = new Date(curr.dt_txt.substr(0, 10)).toLocaleDateString();
    const currentTempIsHotter = prev[currentDate]?.dailyMax.main.temp_max < curr.main.temp_max;

    // initialize dt_txt's data
    const dateNotInitialized = !prev[currentDate];
    if (dateNotInitialized || currentTempIsHotter) {
      prev[currentDate] = {
        date: currentDate,
        dailyMax: curr,
      };
    }

    return prev;
  }, {});
};

export const loader: LoaderFunction = async ({ params }) => {
  const cities = [
    { id: '1', name: 'Ottowa', apiQuery: 'Ottowa,canada', lat: '45.4215', long: '-75.6972' },
    { id: '2', name: 'Moscow', apiQuery: 'Moscow,russia', lat: '55.7558', long: '37.6173' },
    { id: '3', name: 'Tokyo', apiQuery: 'Tokyo,japan', lat: '35.6762', long: '139.6503' },
  ];

  const selectedCityId = params.cityId;
  const selectedCity = cities.find((city) => city.id === selectedCityId) || cities[0]; // default to first city in list if none selected
  const weatherRequestEndpoint = process.env.WEATHER_API_URL;
  invariant(weatherRequestEndpoint, 'Weather API request URL not defined');
  const weatherRequestApiKey = process.env.WEATHER_API_KEY;
  invariant(weatherRequestApiKey, 'Weather API key not defined');

  const weatherRequestURL = new URL(weatherRequestEndpoint);
  const weatherRequestParams = weatherRequestURL.searchParams;
  weatherRequestParams.append('lat', selectedCity.lat);
  weatherRequestParams.append('lon', selectedCity.long);
  weatherRequestParams.append('units', 'metric');
  weatherRequestParams.append('appid', weatherRequestApiKey);

  const weatherRes = await fetch(weatherRequestURL.toString());
  return json<LoaderData>({ cities, weatherData: await weatherRes.json() });
};

export default function Index() {
  const { cities, weatherData } = useLoaderData<LoaderData>();
  const dailyMaxes = Object.values(getDailyMaxes(weatherData.list));
  console.log(dailyMaxes);
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <li className='city__list'>
        {cities.map((city) => (
          <>
            <CityLink key={city.id} to={`/city/${city.id}`}>
              {city.name}
            </CityLink>
          </>
        ))}
      </li>
      <WeatherContainer>
        <WeatherCard
          size='large'
          day={'Today'}
          description={dailyMaxes[0].dailyMax.weather[0].main}
          temperature={dailyMaxes[0].dailyMax.main.temp_max.toFixed(0)}
        />
        <>
          {dailyMaxes.slice(1, 5).map((dailyMax) => (
            <WeatherCard
              key={dailyMax.dt_txt}
              day={new Date(dailyMax.dailyMax.dt_txt).toDateString().substring(0, 3)}
              description={dailyMax.dailyMax.weather[0].main}
              temperature={dailyMax.dailyMax.main.temp_max.toFixed(0)}
            />
          ))}
        </>
      </WeatherContainer>
    </div>
  );
}

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: 'https://unpkg.com/modern-css-reset@1.4.0/dist/reset.min.css',
    },
  ];
}
