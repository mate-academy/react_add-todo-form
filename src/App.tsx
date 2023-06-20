import React, { useState } from 'react';

import './App.scss';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { getNewId, getUserById } from './helper';

const fullTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId, usersFromServer),
}));

export const App:React.FC = () => {
  const [todos, setTodos] = useState(fullTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [userError, setUserError] = useState('');
  const [titleError, setTitleError] = useState('');

  const clearFormFields = () => {
    setTitle('');
    setUserId(0);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (titleError !== '') {
      setTitleError('');
    }

    setTitle(event.target.value);
  };

  const handleUserChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
    if (userError !== '') {
      setUserError('');
    }

    setUserId(+event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!userId) {
      setUserError('Please choose a user');
    }

    if (title.trim() === '') {
      setTitleError('Please enter a title');
    }

    if (!userId || title.trim() === '') {
      return;
    }

    const newTodo = {
      id: getNewId(todos),
      title,
      userId,
      completed: false,
      user: getUserById(userId, usersFromServer),
    };

    setTodos((prev) => [...prev, newTodo]);
    clearFormFields();
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
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Title"
            value={title}
            onChange={handleTitleChange}
          />

          {titleError && <span className="error">{titleError}</span>}
        </div>

        <div className="field">
          <label htmlFor="user">Select user</label>

          <select
            data-cy="userSelect"
            name="user"
            value={userId}
            onChange={handleUserChange}
          >
            <option value={0} disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>

          {userError && <span className="error">{userError}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />

    </div>
  );
};
