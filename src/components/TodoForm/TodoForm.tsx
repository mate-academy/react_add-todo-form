import React, { useState } from 'react';
import usersFromServer from '../../api/users';
import { Todo } from './../../types/Todo';

export const TodoForm = ({
  setTodos,
  todos,
}: {
  setTodos: (todos: Todo[]) => void;
  todos: Todo[];
}) => {
  const [inputTitle, setInputTitle] = useState('');
  const [errorTitle, setErrorTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [errorUser, setErrorUser] = useState('');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(event.target.value);
    setErrorTitle('');
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(parseInt(event.target.value));
    setErrorUser('');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errorHandler = { hasErrors: false };

    if (!inputTitle.trim()) {
      setErrorTitle('Please enter a title');
      errorHandler.hasErrors = true;
    }

    if (selectedUserId === 0) {
      setErrorUser('Please choose a user');
      errorHandler.hasErrors = true;
    }

    if (errorHandler.hasErrors) {
      return;
    }

    const newTodo: Todo = {
      id: Math.max(...todos.map(todo => todo.id), 0) + 1,
      title: inputTitle.trim(),
      userId: selectedUserId,
      completed: false,
      user: usersFromServer.find(user => user.id === selectedUserId),
    };

    setTodos([...todos, newTodo]);
    setInputTitle('');
    setSelectedUserId(0);
  };

  return (
    <form onSubmit={handleSubmit} action="/api/todos" method="POST">
      <div className="field">
        <label htmlFor="title">Title: </label>
        <input
          onChange={handleTitleChange}
          value={inputTitle}
          type="text"
          data-cy="titleInput"
          placeholder="Enter a title"
        />
        <span className="error">{errorTitle}</span>
      </div>

      <div className="field">
        <label htmlFor="user">User: </label>
        <select
          onChange={handleUserChange}
          value={selectedUserId}
          data-cy="userSelect"
        >
          <option value={0} disabled>
            Choose a user
          </option>
          {usersFromServer.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        <span className="error">{errorUser}</span>
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
