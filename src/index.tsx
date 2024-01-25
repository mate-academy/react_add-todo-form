import ReactDOM from 'react-dom';
import { App } from './App';
import { GoodsProvider } from './GoodsContext';

const Root = () => (
  <GoodsProvider>
    <App />
  </GoodsProvider>
);

ReactDOM.render(
  <Root />,
  document.getElementById('root'),
);
