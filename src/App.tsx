import React, { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User, Todos } from './react-app-env';
import { TodoList } from './components/TodoList';
import { findUser } from './utils';

const users: User[] = usersFromServer;

const todos: Todos[] = todosFromServer.map((todo) => ({
  ...todo,
  user: findUser(todo.userId, users),
}));

export const App: React.FC = () => {
  const [userId, setUserId] = useState(0);
  const [isUserIdValid, setIsUserIdValid] = useState(false);
  const [title, setTitle] = useState('');
  const [isTitleValid, setIsTitleValid] = useState(false);

  const resetForm = () => {
    setUserId(0);
    setTitle('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setIsUserIdValid(!userId);
    setIsTitleValid(!title);

    const maxId = Math.max(...todos.map(todo => todo.id));

    if (userId && title) {
      todos.push({
        id: maxId + 1,
        title,
        completed: false,
        userId,
        user: findUser(userId, users),
      });

      resetForm();
    }
  };

  const handleTitleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = event.target.value;

    setTitle(currentValue);
    setIsTitleValid(!currentValue);
  };

  const handleUserSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const currentValue = +event.target.value;

    setUserId(currentValue);
    setIsUserIdValid(!currentValue);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label>
            <span>Title: </span>
            <input
              type="text"
              data-cy="titleInput"
              value={title}
              placeholder="Enter a title"
              onChange={handleTitleInput}
            />
          </label>

          {isTitleValid && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            <span>User: </span>
            <select
              data-cy="userSelect"
              value={userId}
              onChange={handleUserSelection}
            >
              <option value="0" disabled>Choose a user</option>
              {users.map(({ id, name }) => (
                <option value={id}>{name}</option>
              ))}
            </select>
          </label>

          {isUserIdValid && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
