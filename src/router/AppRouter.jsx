import { Navigate, Route, Routes } from 'react-router-dom';
import { Navbar } from '../components';
import { HomePage } from '../pages';
import { routes } from './routes';

export const AppRouter = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />

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
