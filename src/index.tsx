import ReactDOM from 'react-dom';
import { App } from './App';
import { TodosProvider } from './components/TodosProvider';

ReactDOM.render(
  <TodosProvider>
    <App />
  </TodosProvider>,
  document.getElementById('root'),
);
