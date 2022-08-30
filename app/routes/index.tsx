import { CityLink } from '~/components/CityLink';
import { WeatherCard, WeatherContainer } from '~/components/WeatherCard';

export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <li className='city__list'>
        <CityLink to='?city=Ottowa'>Ottowa</CityLink>
        <CityLink to='?city=Moscow'>Moscow</CityLink>
        <CityLink to='?city=Tokyo'>Tokyo</CityLink>
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
