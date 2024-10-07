import React, { useState } from 'react';
import usersFromServer from './../../api/users';
import { Todo } from '../../types/Todo';
import { getUserById } from '../../utils/getUserById';

interface Props {
  onAdd: (todo: Todo) => void;
}

export const AddTodoForm: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');

  const [selectedUserId, setSelectedUserId] = useState(0);
  const [userIdError, setUserIdError] = useState('');

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError('');
  };

  const handleChangeUserId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
    setUserIdError('');
  };

  const handleReset = () => {
    setTitle('');
    setTitleError('');

    setSelectedUserId(0);
    setUserIdError('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      setTitleError('Please enter a title');
    }

    if (selectedUserId === 0) {
      setUserIdError('Please choose a user');
    }

    if (!title || selectedUserId === 0) {
      return;
    }

    const newTodo: Todo = {
      id: 0,
      title: title,
      completed: false,
      userId: selectedUserId,
      user: getUserById(selectedUserId),
    };

    onAdd(newTodo);

    handleReset();
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="title">Title: </label>

        <input
          id="title"
          type="text"
          placeholder="Enter a title"
          data-cy="titleInput"
          value={title}
          onChange={handleChangeTitle}
        />

        {titleError && <span className="error">{titleError}</span>}
      </div>

      <div className="field">
        <label htmlFor="user">User: </label>

        <select
          id="user"
          data-cy="userSelect"
          value={selectedUserId}
          onChange={handleChangeUserId}
        >
          <option value="0" disabled>
            Choose a user
          </option>

          {usersFromServer.map(user => {
            return (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            );
          })}
        </select>

        {userIdError && <span className="error">{userIdError}</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
