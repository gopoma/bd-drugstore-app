import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={<h1>Loading...</h1>}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </Suspense>
    </Provider>
  );
}

export default App;
