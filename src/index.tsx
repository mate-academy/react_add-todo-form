import { createRoot } from 'react-dom/client';
import { App } from './App';
import 'bulma';
import '@fortawesome/fontawesome-free/css/all.css';

createRoot(document.getElementById('root') as HTMLElement).render(<App />);
