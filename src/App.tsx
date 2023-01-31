import {
  useState,
} from 'react';
import './App.scss';
import { TodoListWrapper } from './components/TodoList/TodoListWrapper';

export const App = () => {
  const [counter, setCounter] = useState(0);

  return (
    <div className="App">
      <button
        type="button"
        onClick={() => setCounter(counter + 1)}
      >
        {`Change counter - ${counter}`}
      </button>

      <h1>Add todo form</h1>

      <TodoListWrapper />
    </div>
  );
};
