import React, { useState } from 'react';
import type { Todo, User } from '../../types';

type Props = {
  todos: Todo[];
  users: User[];
  onAdd: (todo: Todo) => void;
};

export const TodoForm: React.FC<Props> = ({ todos, users, onAdd }) => {
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const selectedUserObj = users.find(
    (user: User) => user.id === Number(selectedUser),
  )!;

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);

    if (titleError) {
      setTitleError(false);
    }
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(event.target.value);

    if (userError) {
      setUserError(false);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const hasTitleError = !title.trim();
    const hasUserError = !selectedUser;

    setTitleError(hasTitleError);
    setUserError(hasUserError);

    if (hasTitleError || hasUserError) {
      return;
    }

    if (!hasTitleError && !hasUserError && selectedUserObj) {
      onAdd({
        id: Math.max(...todos.map(todo => todo.id)) + 1,
        title,
        completed: false,
        userId: Number(selectedUser),
        user: selectedUserObj,
      });
      setTitle('');
      setSelectedUser('');
    }
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="todo-title">Title:</label>
        <input
          type="text"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={title}
          onChange={handleTitleChange}
        />
        {titleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="todo-user">User:</label>
        <select
          data-cy="userSelect"
          value={selectedUser}
          onChange={handleUserChange}
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

        {userError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
