import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

interface Todo {
  id: number,
  title: string,
  completed: boolean,
  // userId: number | null,
  userId: number,
}

interface User {
  id: number,
  name: string,
  username: string,
  email: string,
}

function getUserIDByName(arr: User[], name: string) {
  const user = arr.find(item => item.name === name) || 1;

  return user === 1 ? 1 : user.id;
}

function getTodoId(todos: Todo[]): number {
  const arr = todos.map(item => item.id);

  return Math.max(...arr) + 1;
}

export const App = () => {
  const users: User[] = usersFromServer;
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);

  const [title, setTitle] = useState('');
  const [name, setName] = useState('0');

  const newTodo = {
    id: getTodoId(todos),
    title,
    completed: false,
    userId: getUserIDByName(users, name),
  };

  const [titleError, setTitleError] = useState(false);
  const [nameError, setNameError] = useState(false);

  const handleTitleError = () => {
    if (!title) {
      setTitleError(true);
    } else {
      setTitleError(false);
    }
  };

  const handleNameError = () => {
    if (name === '0') {
      setNameError(true);
    } else {
      setNameError(false);
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setName(event.target.value);
    setNameError(false);
  };

  const reset = () => {
    setTitle('');
    setName('0');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleTitleError();
    handleNameError();

    if (name !== '0' && title) {
      reset();
    }

    if (!title || name === '0') {
      return;
    }

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  const [defaultOptionDisabled, setDefaultOptionDisabled] = useState(false);
  const handleDefaultOptionDisabled = () => {
    setDefaultOptionDisabled(true);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onReset={reset}
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label>
            Title:&nbsp;
            <input
              type="text"
              data-cy="titleInput"
              value={title}
              placeholder="Enter a title"
              onChange={handleTitleChange}
            />
          </label>

          {titleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            User:&nbsp;
            <select
              data-cy="userSelect"
              value={name}
              onChange={handleNameChange}
              onClick={handleDefaultOptionDisabled}
            >
              <option
                value="0"
                disabled={defaultOptionDisabled}
              >
                Choose a user
              </option>
              {users.map((user) => (
                <option value={user.name} key={user.id}>{user.name}</option>
              ))}
            </select>
          </label>

          {nameError && (
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
