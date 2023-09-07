import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import { getMaxId } from '../../services/todoId';
import { getUserById } from '../../services/user';
import { getValidTitle } from '../../services/title';
import usersFromServer from '../../api/users';

type TodoFormProps = {
  initialTodos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export const Form: React.FC<TodoFormProps> = ({ initialTodos, setTodos }) => {
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');

  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const resetForm = () => {
    setUserId(0);
    setTitle('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title && !userId) {
      setHasUserIdError(true);
      setHasTitleError(true);

      return;
    }

    if (!title) {
      setHasTitleError(true);

      return;
    }

    if (!userId) {
      setHasUserIdError(true);

      return;
    }

    const newTodo: Todo = {
      id: getMaxId(initialTodos) + 1,
      title: getValidTitle(title),
      completed: false,
      userId,
      user: getUserById(userId),
    };

    setTodos((prevTodos: Todo[]) => [...prevTodos, newTodo]);
    resetForm();
  };

  return (
    <div className="App">
      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="title">Title:&nbsp;</label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user-id">User:&nbsp;</label>

          <select
            id="user-id"
            data-cy="userSelect"
            required
            value={userId}
            onChange={handleUserChange}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {hasUserIdError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
    </div>
  );
};
