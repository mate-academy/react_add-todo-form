import './App.scss';

import {
  useCallback, useContext, useMemo, useState,
} from 'react';
import debounce from 'lodash/debounce';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import { TodosContext } from './components/TodosProvider';

export const App = () => {
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');
  const [count, setCount] = useState(0);

  const { todos } = useContext(TodosContext);

  const lowerQuery = appliedQuery.toLowerCase();

  const applyQuery = useCallback(debounce(setAppliedQuery, 1000), []);

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => (
      todo.title.toLowerCase().includes(lowerQuery)
    ));
  }, [todos, lowerQuery]);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <button
        type="button"
        onClick={() => setCount((currentCount) => currentCount + 1)}
      >
        {`Click me: ${count}`}
      </button>

      <input
        type="text"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          applyQuery(event.target.value);
        }}
      />

      <TodoForm />

      <TodoList todos={filteredTodos} />
    </div>
  );
};
