import './App.scss';

import {
  useCallback, useMemo, useState,
} from 'react';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { getUserById } from './utils/getUserById';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

// eslint-disable-next-line @typescript-eslint/ban-types
function debounce(f: Function, delay: number) {
  let timerId = 0;

  return (...args: any[]) => {
    if (timerId) {
      window.clearTimeout(timerId);
    }

    timerId = window.setTimeout(() => {
      f(...args);
      // setAppliedQuery(event.target.value)
    }, delay);
  };
}

// call function
// call function 2
// call function 3
// call function 4

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');
  const [count, setCount] = useState(0);

  // useEffect(() => {
  //   const timerId = window.setTimeout(() => {
  //     setAppliedQuery(query);
  //   }, 1000);
  //
  //   return () => {
  //     window.clearTimeout(timerId);
  //   };
  // }, [query]);

  const lowerQuery = appliedQuery.toLowerCase();

  const applyQuery = useCallback(debounce(setAppliedQuery, 1000), []);

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => (
      todo.title.toLowerCase().includes(lowerQuery)
    ));
  }, [todos, lowerQuery]);

  const addTodo = useCallback((todo: Todo) => {
    setTodos((currentTodos) => ([
      ...currentTodos, todo,
    ]));
  }, []);

  const deleteTodo = useCallback((todoId: number) => {
    setTodos((currentTodos) => (
      currentTodos.filter(todo => todo.id !== todoId)
    ));
  }, []);

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

      <TodoForm addTodo={addTodo} todos={todos} />

      <TodoList todos={filteredTodos} deleteTodo={deleteTodo} />
    </div>
  );
};
