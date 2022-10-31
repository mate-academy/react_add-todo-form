import { useCallback, useMemo, useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoWithUser } from './react-app-env';
import { getUserById } from './utils/getUserById';
import { getTodoId } from './utils/getTodoId';
import { TodoForm } from './components/TodoForm';

const todosWithUser: TodoWithUser[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId, usersFromServer),
}));

type Callback = (str: string) => void;

function debounce(f: Callback, delay: number) {
  let timerId = 0;

  return (str: string) => {
    window.clearTimeout(timerId);

    // timerId = window.setTimeout(f, delay, str);

    timerId = window.setTimeout(() => {
      f(str);
    }, delay);
  };
}

export const App = () => {
  const [todos, setTodos] = useState<TodoWithUser[]>(todosWithUser);
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');
  const [counter, setCounter] = useState(0);

  const applyQuery = useCallback(
    debounce(setAppliedQuery, 1000),
    [],
  );

  const addNewTodo = (todoTitle: string, todoUserId: number) => {
    const newTodo: TodoWithUser = {
      id: getTodoId(todos),
      title: todoTitle,
      completed: false,
      userId: todoUserId,
      user: getUserById(todoUserId, usersFromServer),
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  const deleteTodo = useCallback((todoId: number) => {
    setTodos(currentTodos => currentTodos.filter(
      todo => todo.id !== todoId,
    ));
  }, []);

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => (
      todo.title.toLowerCase().includes(appliedQuery.toLowerCase())
    ));
  }, [todos, appliedQuery]);

  return (
    <div className="App">
      <input
        type="text"
        value={query}
        onChange={event => {
          setQuery(event.target.value);
          applyQuery(event.target.value);
        }}
      />

      <button
        type="button"
        onClick={() => setCounter(counter + 1)}
      >
        {`Change counter - ${counter}`}
      </button>

      <h1>Add todo form</h1>

      <TodoForm addNewTodo={addNewTodo} />

      <TodoList todos={visibleTodos} deleteTodo={deleteTodo} />
    </div>
  );
};
