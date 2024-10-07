import React, { useState } from 'react';
import { Todo } from '../../types/Todo';

import usersFromServer from '../../api/users';
import { User } from '../../types/User';
import { getUserById } from '../../services/user';

enum ErrorType {
  Default = '',
  TitleError = 'Please enter a title',
  UserError = 'Please choose a user',
}

type Props = {
  onSubmit: (todo: Todo) => void;
};

export const TodoForm: React.FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState<ErrorType>(ErrorType.Default);

  const [userId, setUserId] = useState(0);
  const [userIdError, setUserIdError] = useState<ErrorType>(ErrorType.Default);

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value.trimStart());
    setTitleError(ErrorType.Default);
  };

  const handleChangeUserId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserIdError(ErrorType.Default);
  };

  const reset = () => {
    setUserId(0);
    setTitle('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isTitleValid = !!title;
    const isUserIdValid = userId !== 0;

    setTitleError(isTitleValid ? ErrorType.Default : ErrorType.TitleError);
    setUserIdError(isUserIdValid ? ErrorType.Default : ErrorType.UserError);

    if (!isTitleValid || !isUserIdValid) {
      return;
    }

    onSubmit({
      id: 0,
      title,
      userId,
      user: getUserById(userId),
      completed: false,
    });

    reset();
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          value={title}
          placeholder="Enter a title"
          onChange={handleChangeTitle}
        />
        {titleError && <span className="error">{titleError}</span>}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          value={userId}
          onChange={handleChangeUserId}
        >
          <option value="0" disabled>
            Choose a user
          </option>

          {usersFromServer.map((user: User) => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {userIdError && <span className="error">{userIdError}</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
