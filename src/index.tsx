import ReactDOM from 'react-dom';
import App from './App';
import { GoodsContextProvider } from './GoodsContextProvider';

ReactDOM.render(
  <GoodsContextProvider>
    <App />
  </GoodsContextProvider>,
  document.getElementById('root'),
);
