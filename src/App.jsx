import { useEffect } from 'react';
import { productsApi } from './api';

function App() {
  useEffect(() => {
    productsApi.get('/categorias/')
      .then(console.log)
      .catch(console.error);
  }, []);

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
    </>
  );
}

export default App;
