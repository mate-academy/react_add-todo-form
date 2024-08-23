import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { useEffect, useState } from 'react';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user?: User;
};

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const users: User[] = [...usersFromServer];
  const [inputHasError, setInputHasError] = useState(false);
  const [selectHasError, setSelectHasError] = useState(false);

  useEffect(() => {
    const updatedTodos = todosFromServer.map(t => ({
      ...t,
      user: usersFromServer.find(u => u.id === t.userId),
    }));

    setTodos(updatedTodos);
  }, []);

  function errors(): void {
    if (!inputValue.trim()) {
      setInputHasError(true);
    } else {
      setInputHasError(false);
    }

    if (!selectValue) {
      setSelectHasError(true);
    } else {
      setSelectHasError(false);
    }
  }

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    errors();

    if (inputValue.trim() && selectValue) {
      const newTodo: Todo = {
        id:
          todos.reduce(
            (maxId, todo) => (todo.id > maxId ? todo.id : maxId),
            todos[0]?.id || 0,
          ) + 1,
        title: inputValue,
        completed: false,
        userId: +selectValue,
        user: users.find(u => u.id === +selectValue),
      };

      setTodos([...todos, newTodo]);

      setInputValue('');
      setSelectValue('');
    }
  };

  function isInputHasError(value: string): void {
    if (value !== '') {
      setInputHasError(false);
    } else {
      setInputHasError(true);
    }
  }

  function isSelectHasError(value: string): void {
    if (value !== '') {
      setSelectHasError(false);
    } else {
      setSelectHasError(true);
    }
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={onSubmitHandler}>
        <div className="field">
          <input
            placeholder="Enter a title"
            type="text"
            data-cy="titleInput"
            value={inputValue}
            onChange={event => {
              isInputHasError(event.target.value);
              setInputValue(event.target.value);
            }}
          />
          {inputHasError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectValue}
            onChange={event => {
              isSelectHasError(event.target.value);
              setSelectValue(event.target.value);
            }}
          >
            <option value="" disabled>
              Choose a user
            </option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {selectHasError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
