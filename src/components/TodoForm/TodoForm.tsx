import React, { useState } from 'react';
import { ToDo } from '../../types/ToDo';
import { User } from '../../types/User';

interface Props {
  onSubmit: (todo: ToDo) => void;
  users: User[];
}

export const TodoForm: React.FC<Props> = ({ onSubmit, users }) => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);

  const [selectedUser, setSelectedUser] = useState(0);
  const [selectedUserError, setSelectedUserError] = useState(false);

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value.replace(/[^a-zA-Zа-яА-ЯіІїЇєЄґҐ0-9\s]/g, ''));
    setTitleError(false);
  };

  const handleResetForm = () => {
    setTitle('');
    setSelectedUser(0);
    setTitleError(false);
    setSelectedUserError(false);
  };

  const handleChangeSelectValue = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedUser(+event.target.value);
    setSelectedUserError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    setTitleError(!trimmedTitle);
    setSelectedUserError(!selectedUser);

    if (!trimmedTitle || !selectedUser) {
      return;
    }

    const newToDo: ToDo = {
      id: 0,
      title: trimmedTitle,
      userId: selectedUser,
      completed: false,
      user: users.find(item => item.id === selectedUser) || null,
    };

    onSubmit(newToDo);
    handleResetForm();
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          value={title}
          placeholder="Please enter a title"
          onChange={handleChangeTitle}
        />
        {titleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          value={selectedUser}
          onChange={handleChangeSelectValue}
        >
          <option value="0" disabled>
            Choose a user
          </option>
          {users.map(user => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {selectedUserError && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
