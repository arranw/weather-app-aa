import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faCloud, faCloudRain, faQuestion, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const getWeatherIcon = (weatherDescription?: string): IconProp => {
  switch (weatherDescription) {
    case 'Clouds':
      return faCloud;
    case 'Rain':
      return faCloudRain;
    case 'Clear':
      return faSun;
    default:
      return faQuestion;
  }
};

interface WeatherIconProps {
  weatherDescription?: string;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({ weatherDescription }) => {
  const weatherIcon = getWeatherIcon(weatherDescription);

  return (
    <FontAwesomeIcon
      className='weather__icon'
      icon={weatherIcon}
      title={weatherDescription}
      aria-label={weatherDescription}
    />
  );
};
