import { Link } from 'react-router-dom';

export const HomePage = () => {
  return (
    <>
      <h1>bd-drugstore-app</h1>

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
