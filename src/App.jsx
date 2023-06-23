import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router';

function App() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
