import React, { FC, useState } from 'react';
import { User, Todo } from './react-app-env';

import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { getNewId } from './helpers/helpers';

const getUserById = (userId: number): User | null => {
  return usersFromServer.find(user => user.id === userId) || null;
};

const todosWithUser: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: FC = () => {
  const [todos, setTodos] = useState(todosWithUser);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [
    titleErrorMessage,
    setTitleErrorMessage,
  ] = useState('');
  const [
    userErrorMessage,
    setUserErrorMessage,
  ] = useState('');

  const reset = () => {
    setTitle('');
    setUserId(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title || !userId) {
      setTitleErrorMessage(!title ? 'Please enter a title' : '');
      setUserErrorMessage(!userId ? 'Please choose a user' : '');

      return;
    }

    setTodos(prev => {
      const newTodo = {
        id: getNewId(prev),
        title,
        completed: false,
        user: getUserById(userId),
      };

      return [...prev, newTodo];
    });

    reset();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleErrorMessage('');
    setTitle(event.target.value);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserErrorMessage('');
    setUserId(+event.target.value);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST">
        <div className="field">
          <label htmlFor="titleInput">
            {'Title: '}
          </label>

          <input
            id="titleInput"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={(event) => handleInputChange(event)}
          />

          <label
            htmlFor="titleInput"
            className="error"
          >
            {titleErrorMessage}
          </label>

        </div>

        <div className="field">
          <label htmlFor="userInput" className="">User: </label>

          <select
            id="userInput"
            data-cy="userSelect"
            value={userId}
            onChange={handleSelectChange}
          >
            <option value={0} disabled>Choose a user</option>
            {
              usersFromServer.map(userFromServer => (
                <option value={userFromServer.id}>{userFromServer.name}</option>
              ))
            }
          </select>

          <label
            htmlFor="userInput"
            className="error"
          >
            {userErrorMessage}
          </label>

        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={handleSubmit}
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
