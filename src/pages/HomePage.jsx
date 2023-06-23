import { Link } from 'react-router-dom';

import classes from './HomePage.module.css';

console.log(classes);

export const HomePage = () => {
  return (
    <>
      <h1 className={classes['title']}>bd-drugstore-app</h1>

      <section>
        <span>Integrantes:</span>
        <ul>
          <li>Chambilla Perca, Valentina Milagros</li>
          <li>Ordoño Poma, Gustavo Eduardo</li>
          <li>Pacori Anccasi, Diego Ivan</li>
        </ul>
      </section>

      <section>
        <Link to="/admin">Panel de Administración</Link>
      </section>
    </>
  );
};

export default HomePage;
