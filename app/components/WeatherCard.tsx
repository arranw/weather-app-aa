import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud } from '@fortawesome/free-solid-svg-icons';

interface WeatherCardProps {
  size?: 'regular' | 'large';
}
export const WeatherCard: React.FC<WeatherCardProps> = ({ size }) => {
  return (
    <section className={`weather__card weather__card--${size ?? 'regular'}`}>
      <span className='weather__day'>Today</span>
      <FontAwesomeIcon className='weather__icon' icon={faCloud} />
      <span className='weather__data'>19°</span>
      <span className='weather__description'>Clouds</span>
    </section>
  );
};

interface WeatherContainerProps {
  children: React.ReactElement | React.ReactElement[];
}

export const WeatherContainer: React.FC<WeatherContainerProps> = ({ children }) => {
  return <div className='weather__container'>{children}</div>;
};
