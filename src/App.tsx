import React, { useState } from 'react';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { Todo } from './types/Todo';
import { User } from './types/User';

import './App.scss';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const allTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

const calcMaxTotoId = Math.max(0, ...allTodos.map(({ id }) => id)) + 1;

export const App: React.FC = () => {
  const [takeTodos, setTakeTodos] = useState(allTodos);
  const [takeTitle, setTakeTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [takeUserId, setTakeUserId] = useState(0);
  const [userError, setUserError] = useState(false);

  const handleForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTodo: Todo = {
      id: calcMaxTotoId,
      title: takeTitle,
      completed: false,
      userId: takeUserId,
      user: getUser(takeUserId),
    };

    if (takeTitle.trim() && takeUserId) {
      setTakeTodos((prev) => [...prev, newTodo]);
      setTakeTitle('');
      setTakeUserId(0);
    } else {
      setTitleError(takeTitle.trim() === '');
      setUserError(takeUserId === 0);
    }
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTakeTitle(event.target.value);
    setTitleError(false);
  };

  const handleUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTakeUserId(Number(event.target.value));
    setUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleForm}
      >
        <div className="field">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            data-cy="titleInput"
            name="title"
            placeholder="Enter a title"
            value={takeTitle}
            onChange={handleTitle}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="title">User:</label>
          <select
            data-cy="userSelect"
            name="user"
            value={takeUserId}
            onChange={handleUser}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(({ name, id }) => (
              <option value={id}>{name}</option>
            ))}
          </select>

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={takeTodos} />
    </div>
  );
};
