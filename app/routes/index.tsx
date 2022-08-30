import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { CityLink } from '~/components/CityLink';
import { WeatherCard, WeatherContainer } from '~/components/WeatherCard';

type City = {
  id: string;
  name: string;
  lat: string;
  long: string;
};

export const loader: LoaderFunction = async () => {
  return json([
    { id: '1', name: 'Ottowa', lat: '', long: '' },
    { id: '2', name: 'Moscow', lat: '', long: '' },
    { id: '3', name: 'Tokyo', lat: '', long: '' },
  ]);
};

export default function Index() {
  const cities = useLoaderData<City[]>();

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <li className='city__list'>
        {cities.map((city) => (
          <CityLink key={city.id} cityId={city.id}>
            {city.name}
          </CityLink>
        ))}
      </li>
      <WeatherContainer>
        <WeatherCard size='large'></WeatherCard>
        <WeatherCard></WeatherCard>
        <WeatherCard></WeatherCard>
        <WeatherCard></WeatherCard>
        <WeatherCard></WeatherCard>
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
