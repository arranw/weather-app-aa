import { NavLink } from 'react-router-dom';
import type { To } from 'react-router-dom';

interface CityLinkProps {
  children: string;
  to: To;
}

export const CityLink: React.FC<CityLinkProps> = ({ to, children }) => {
  return (
    <NavLink
      className={({ isActive }) => (isActive ? 'city__link city__link--active' : 'city__link')}
      to={to}
    >
      {children}
    </NavLink>
  );
};
