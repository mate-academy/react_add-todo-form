import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user?: User | null;
};

const getUserById = (userId: number): User | null => {
  return (
    usersFromServer.find(userFromServer => userId === userFromServer.id) || null
  );
};

export const todos: Todo[] = todosFromServer.map(todo => {
  return { ...todo, user: getUserById(todo.userId) };
});

export const App = () => {
  const [visibleTodos, setVisibleTodos] = useState(todos);
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('0');
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    let isValid = true;

    if (title === '') {
      setTitleError(true);
      isValid = false;
    } else {
      setTitleError(false);
    }

    if (selectedUserId === '0') {
      setUserError(true);
      isValid = false;
    } else {
      setUserError(false);
    }

    if (!isValid) {
      return;
    }

    const getId = () => {
      if (visibleTodos.length === 0) {
        return 1;
      }

      return Math.max(...visibleTodos.map(todo => todo.id)) + 1;
    };

    const newTodo: Todo = {
      id: getId(),
      title: title,
      completed: false,
      userId: +selectedUserId,
      user: getUserById(parseInt(selectedUserId)) || null,
    };

    setVisibleTodos(prevTodos => [...prevTodos, newTodo]);
    setTitle('');
    setSelectedUserId('0');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">
            Title:
            <input
              id="titleInput"
              type="text"
              value={title}
              data-cy="titleInput"
              placeholder="Enter a title"
              onChange={event => {
                setTitle(event.target.value);
                if (event.target.value !== '') {
                  setTitleError(false);
                }
              }}
            />
          </label>
          {titleError === false ? null : (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">
            User:
            <select
              id="userSelect"
              data-cy="userSelect"
              defaultValue="0"
              value={selectedUserId}
              onChange={event => {
                setSelectedUserId(event.target.value);
                if (event.target.value !== '0') {
                  setUserError(false);
                }
              }}
            >
              <option value="0" disabled>
                Choose a user
              </option>
              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          {userError === false ? null : (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
