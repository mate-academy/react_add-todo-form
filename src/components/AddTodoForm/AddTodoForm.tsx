import React, { useState } from 'react';
import usersFromServer from './../../api/users';
import { Todo } from '../../types/Todo';
import { getUserById } from '../../utils/getUserById';
import { getNewTodoId } from '../../utils/getNewTodoId';

interface Props {
  onAdd: (todo: Todo) => void;
  todos: Todo[];
}

enum TypeErrors {
  Default = '',
  TitleError = 'Please enter a title',
  UserIdError = 'Please choose a user',
}

export const AddTodoForm: React.FC<Props> = ({ onAdd, todos }) => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(TypeErrors.Default);

  const [selectedUserId, setSelectedUserId] = useState(0);
  const [userIdError, setUserIdError] = useState(TypeErrors.Default);

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(TypeErrors.Default);
  };

  const handleChangeUserId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
    setUserIdError(TypeErrors.Default);
  };

  const handleReset = () => {
    setTitle('');
    setTitleError(TypeErrors.Default);

    setSelectedUserId(0);
    setUserIdError(TypeErrors.Default);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      setTitleError(TypeErrors.TitleError);
    }

    if (!selectedUserId) {
      setUserIdError(TypeErrors.UserIdError);
    }

    if (!title || !selectedUserId) {
      return;
    }

    const newTodo: Todo = {
      id: getNewTodoId(todos),
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

        {titleError && <span className="error">{TypeErrors.TitleError}</span>}
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

        {userIdError && <span className="error">{TypeErrors.UserIdError}</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
