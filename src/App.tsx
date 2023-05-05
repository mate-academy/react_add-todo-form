import React, {
  useCallback, useContext, useMemo, useState,
} from 'react';
import './App.scss';
import debounce from 'lodash.debounce';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import { TodosContext } from './components/TodosProvider';

export const App: React.FC = () => {
  const [appliedQuery, setAppliedQuery] = useState('');
  const [counter, setCounter] = useState(0);

  const applyQuery = useCallback(
    debounce(setAppliedQuery, 1000), [appliedQuery],
  );
  const lowerCaseQuery = appliedQuery.toLowerCase().trim();

  const { todos } = useContext(TodosContext);

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => (
      todo.title.toLowerCase().includes(lowerCaseQuery)
    ));
  }, [todos, lowerCaseQuery]);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <button
        type="button"
        onClick={() => setCounter((previousCounter) => previousCounter + 1)}
      >
        {`Click me! ${counter}`}
      </button>

      <input
        type="text"
        onChange={event => {
          // setQuery(event.target.value);
          applyQuery(event.target.value);
        }}
      />

      <TodoForm />

      <TodoList
        todos={visibleTodos}
      />
    </div>
  );
};
