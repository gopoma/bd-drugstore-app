import { Link } from 'react-router-dom';

export const AdminPanelPage = () => {
  return (
    <>
      <h1>Panel de Administración</h1>
      <ul>
        <li>
          <Link to="/admin/categorias">Categorías</Link>
        </li>
      </ul>
    </>
  );
};

export default AdminPanelPage;
