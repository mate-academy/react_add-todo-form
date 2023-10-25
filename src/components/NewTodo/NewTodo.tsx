import React, { useState } from 'react';
import usersFromServer from '../../api/users';

import { Todo } from '../../types/types';

type Props = {
  onAdd: (todo: Todo) => void;
};

export const NewTodo: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [newUser, setNewUser] = useState('');
  const [todoId, setTodoId] = useState(3);

  const [selectedUserError, setSelectedUserError] = useState(false);
  const [titleError, setTitleError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedTitle = event.target.value
      .replace(/[^A-Za-zА-Яа-я0-9\s]/g, '');

    setTitle(sanitizedTitle);
    setTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNewUser(event.target.value);
    setSelectedUserError(false);
  };

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) {
      setTitleError(true);
      if (!newUser) {
        setSelectedUserError(true);
      }

      return;
    }

    const namedUser = usersFromServer.find((user) => user.name === newUser);

    if (!namedUser) {
      return;
    }

    const newTodo: Todo = {
      id: todoId,
      title,
      userId: namedUser.id,
      completed: false,
    };

    onAdd(newTodo);

    setTodoId(todoId + 1);

    setSelectedUserError(false);
    setTitleError(false);
    setNewUser('');
    setTitle('');
  };

  return (
    <form className="NewTodo" onSubmit={handleAdd}>
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          placeholder="Please enter a title"
          value={title}
          onChange={handleTitleChange}
        />
        {titleError
          && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          onChange={handleUserChange}
          value={newUser}
        >
          <option value="0">Please choose a user</option>
          {usersFromServer.map((userFromList) => {
            return (
              <option
                value={userFromList.name}
                key={userFromList.id}
              >
                {userFromList.name}
              </option>
            );
          })}
        </select>
        {selectedUserError
          && <span className="error">Please choose a user</span>}
      </div>

      <button
        type="submit"
        data-cy="submitButton"
      >
        Add
      </button>
    </form>
  );
};
