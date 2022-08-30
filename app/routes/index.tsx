import { WeatherCard } from '~/components/WeatherCard';
import { WeatherCard, WeatherContainer } from '~/components/WeatherCard';

export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
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
