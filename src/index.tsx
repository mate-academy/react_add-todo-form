import ReactDOM from 'react-dom';
import { App } from './App';
import { TodosProvider } from './TodosContext';

const Root = () => (
  <TodosProvider>
    <App />
  </TodosProvider>
);

ReactDOM.render(
  <Root />,
  document.getElementById('root'),
);
