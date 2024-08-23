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
    if (!inputValue) {
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

    if (inputValue && selectValue) {
      const newTodo: Todo = {
        id: todos.length + 1,
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

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={onSubmitHandler}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={inputValue}
            onChange={event => {
              if (event.target.value !== '') {
                setInputHasError(false);
              } else {
                setInputHasError(true);
              }

              setInputValue(event.target.value);
            }}
          />
          {inputHasError === true && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectValue}
            onChange={event => {
              if (event.target.value !== '') {
                setSelectHasError(false);
              } else {
                setSelectHasError(true);
              }

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

          {selectHasError == true && (
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
