import React, { useState } from 'react';

import { PreparedTodo, User } from '../../types';

type Props = {
  users: User[],
  todos: PreparedTodo[],
  addTask: (newTask: PreparedTodo) => void,
};

const generateNewId = (tasks: PreparedTodo[]) => {
  const tasksIds = tasks.map(({ id }) => id);

  return Math.max(...tasksIds) + 1;
};

export const TodoAddForm: React.FC<Props> = ({ users, todos, addTask }) => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const [selectedUserId, setSelectedUserId] = useState(0);
  const [userError, setUserError] = useState(false);
  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
    setUserError(false);
  };

  const resetForm = () => {
    setTitle('');
    setTitleError(false);
    setSelectedUserId(0);
    setUserError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    setTitleError(!title);
    setUserError(!selectedUserId);

    if (!title || !selectedUserId) {
      return;
    }

    addTask({
      id: generateNewId(todos),
      title,
      completed: false,
      userId: selectedUserId,
      user: users.find(({ id }) => id === selectedUserId) || null,
    });

    resetForm();
  };

  return (

    <form
      action="/api/todos"
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="field">
        <input
          data-cy="titleInput"
          type="text"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
        />

        {titleError && (
          <span className="error">Please enter a title</span>
        )}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          value={selectedUserId}
          onChange={handleUserChange}
        >
          <option value="0">Choose a user</option>

          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {userError && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
