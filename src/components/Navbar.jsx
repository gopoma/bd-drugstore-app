import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">bd-drugstore-app</Link>
        </li>
        <li>
          <Link to="/admin">Panel de Administración</Link>
        </li>
        <li>
          <Link to="/404">Not Found</Link>
        </li>
      </ul>
    </nav>
  );
};
