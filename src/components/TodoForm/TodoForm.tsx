import React, { useState } from 'react';
import { Todo } from '../types/Todo';
import { User } from '../types/User';
import { getUserById } from '../utils/getUserById';

type Props = {
  onSubmit: (todo: Todo) => void;
  todoId: number;
  users: User[];
};

export const ToDoForm: React.FC<Props> = ({ onSubmit, todoId, users }) => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [selectedUserId, setSelectedUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const hadleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const reset = () => {
    setTitle('');
    setSelectedUserId(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!(title.trim()));
    setHasUserIdError(!selectedUserId);

    if (title.trim().length === 0 || !selectedUserId) {
      return;
    }

    onSubmit({
      id: todoId,
      title,
      completed: false,
      userId: selectedUserId,
      user: getUserById(selectedUserId),
    });

    reset();
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="field">
        <label htmlFor="todo-form-title">Title:&nbsp;</label>
        <input
          type="text"
          data-cy="titleInput"
          id="todo-form-title"
          value={title}
          placeholder="Enter a title"
          onChange={handleTitleChange}
        />
        {hasTitleError && (
          <span className="error">Please enter a title</span>
        )}
      </div>

      <div className="field">
        <label htmlFor="todo-form-user">User:&nbsp;</label>
        <select
          data-cy="userSelect"
          id="todo-form-user"
          value={selectedUserId}
          onChange={hadleUserIdChange}
        >

          <option value="0" disabled defaultValue="0">
            Choose a user
          </option>

          {users.map((user) => (
            <option value={user.id} key={user.id}>
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
  );
};
