import React from 'react';

import { WeatherIcon } from './WeatherIcon';

interface WeatherCardProps {
  size?: 'regular' | 'large';
  day?: string;
  temperature?: string;
  description?: string;
}
export const WeatherCard: React.FC<WeatherCardProps> = ({
  size,
  day,
  temperature,
  description,
}) => {
  return (
    <section className={`weather__card weather__card--${size ?? 'regular'}`}>
      <span className='weather__day'>{day}</span>
      <WeatherIcon weatherDescription={description} />
      <span className='weather__data'>{temperature}°</span>
      <span className='weather__description'>{description}</span>
    </section>
  );
};

interface WeatherContainerProps {
  children: React.ReactElement | React.ReactElement[];
}

export const WeatherContainer: React.FC<WeatherContainerProps> = ({ children }) => {
  return <div className='weather__container'>{children}</div>;
};
