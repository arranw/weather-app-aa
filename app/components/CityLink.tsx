import { useSearchParams } from 'react-router-dom';
import { Link } from '@remix-run/react';

interface CityLinkProps {
  children: string;
  cityId: string;
}

export const CityLink: React.FC<CityLinkProps> = ({ cityId, children }) => {
  const [searchParams] = useSearchParams();
  const currentCity = searchParams.get('city');

  return (
    <Link
      className={currentCity === cityId ? 'city__link city__link--active' : 'city__link'}
      to={`?city=${cityId}`}
    >
      {children}
    </Link>
  );
};
