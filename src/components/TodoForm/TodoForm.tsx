import React, { useState } from 'react';

import usersFromServer from '../../api/users';
import { TodoWithUser } from '../../Types/TodosWithUsers';
import { getUserByUserId } from '../../utils/GetUserByUserId';
import { biggestId } from '../../utils/BiggestId';

interface Props {
  onAddTodo: (newTodo: TodoWithUser) => void;
  todos: TodoWithUser[];
}

export const TodoForm: React.FC<Props> = ({ onAddTodo, todos }) => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);

  const [selectedUser, setSelectedUser] = useState(0);
  const [selectedUserError, setSelectedUserError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(+event.target.value);
    setSelectedUserError(false);
  };

  const reset = () => {
    setTitle('');
    setSelectedUser(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) {
      setTitleError(true);
    }

    if (selectedUser === 0) {
      setSelectedUserError(true);
    }

    if (title && selectedUser !== 0) {
      const newBiggestId = biggestId(todos);

      const user = getUserByUserId(selectedUser);

      const newTodo = {
        id: newBiggestId,
        title,
        userId: selectedUser,
        completed: false,
        user,
      };

      onAddTodo(newTodo);
      reset();
    }
  };

  return (
    <form action="../../api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label className="label" htmlFor={'title'}>
          Title:{' '}
        </label>
        <input
          type="text"
          data-cy="titleInput"
          id="title"
          placeholder="Enter a title"
          value={title}
          onChange={handleTitleChange}
        />
        {titleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label className="label" htmlFor={'user'}>
          User:{' '}
        </label>
        <select
          data-cy="userSelect"
          value={selectedUser}
          id="user"
          onChange={handleUserChange}
        >
          <option value="0" disabled>
            Choose a user
          </option>
          {usersFromServer.map(user => (
            <option key={user.id} value={user.id}>
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
