import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { NavLink, PrefetchPageLinks, useLoaderData } from '@remix-run/react';
import React from 'react';
import { WeatherCard, WeatherContainer } from '~/components/WeatherCard';
import type { CityType, DailyForecastType } from '~/services/weather.service';
import { getFiveDayForecast } from '~/services/weather.service';
import { fetchWeatherForecast } from '~/services/weather.service';

interface LoaderData {
  cities: CityType[];
  forecast: DailyForecastType[];
}

export const loader: LoaderFunction = async ({ params }) => {
  const cities = [
    { id: '1', name: 'Ottowa', lat: '45.4215', lon: '-75.6972' },
    { id: '2', name: 'Moscow', lat: '55.7558', lon: '37.6173' },
    { id: '3', name: 'Tokyo', lat: '35.6762', lon: '139.6503' },
  ];

  const selectedCityId = params.cityId;
  const selectedCity = cities.find((city) => city.id === selectedCityId) || cities[0]; // default to first city in list if none selected

  const weatherData = await fetchWeatherForecast(selectedCity);
  const forecast = getFiveDayForecast(weatherData.list);

  return json<LoaderData>({ cities, forecast });
};

export default function Index() {
  const { cities, forecast } = useLoaderData<LoaderData>();
  // Extract today's weather for the large weather display
  const todaysForecast = forecast[0];

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <ul className='city__list'>
        {cities.map((city) => (
          <li key={city.id}>
            <NavLink
              className={({ isActive }) =>
                isActive ? 'city__link city__link--active' : 'city__link'
              }
              to={`/city/${city.id}`}
            >
              {city.name}
            </NavLink>
            <PrefetchPageLinks page={`/city/${city.id}`} />
          </li>
        ))}
      </ul>
      <WeatherContainer>
        <WeatherCard
          size='large'
          day={'Today'}
          description={todaysForecast.description}
          temperature={todaysForecast.temperature}
        />
        <>
          {forecast.slice(1, 5).map((forecastDay) => (
            <WeatherCard
              key={forecastDay.date}
              day={new Date(forecastDay.date).toDateString().substring(0, 3)}
              description={forecastDay.description}
              temperature={forecastDay.temperature}
            />
          ))}
        </>
      </WeatherContainer>
    </div>
  );
}
