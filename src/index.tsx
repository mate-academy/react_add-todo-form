import { createRoot } from 'react-dom/client';
import { App } from './App';
import { GlobalProvider } from './GlobalContext';

const Root = () => (
  <GlobalProvider>
    <App />
  </GlobalProvider>
);

createRoot(document.getElementById('root') as HTMLElement).render(<Root />);
