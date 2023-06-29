import { Navigate, Route, Routes } from 'react-router-dom';
import { Navbar } from '../components';
import { routes } from './routes';

export const AppRouter = () => {
  return (
    <>
      <Navbar />
      <Routes>
        {
          routes.map(({ path, Component }) => (
            <Route
              key={path}
              path={path}
              element={<Component />}
            />
          ))
        }

        <Route path="/*" element={<Navigate to="/404" />} replace />
      </Routes>
    </>
  );
};
