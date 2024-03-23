import { createRoot } from 'react-dom/client';
import { App } from './App';

createRoot(document.getElementById('root') as HTMLElement).render(
  <App
    todos={[]}
    onSubmit={function (): void {
      throw new Error('Function not implemented.');
    }}
  />,
);
