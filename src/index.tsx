import { createRoot } from 'react-dom/client';
import { App } from './App';
import { GoodsProvider } from './components/GoodsContext';

const Root = () => (
  <GoodsProvider>
    <App />
  </GoodsProvider>
);

createRoot(document.getElementById('root') as HTMLElement).render(<Root />);
