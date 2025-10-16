import React from 'react';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { EMPTY_USER } from '../../constants/defaultUser';

interface TodoFormProps {
  onSubmit: (todo: Todo) => void;
  generatedId: number;
  users: User[];
}

export const TodoForm: React.FC<TodoFormProps> = ({
  onSubmit,
  generatedId,
  users,
}) => {
  const [title, setTitle] = React.useState('');
  const [titleErrorMessage, setTitleErrorMessage] = React.useState('');

  const [userId, setUserId] = React.useState<number>(0);
  const [userErrorMessage, setUserErrorMessage] = React.useState('');

  const reset = () => {
    setTitle('');
    setUserId(0);
    setTitleErrorMessage('');
    setUserErrorMessage('');
  };

  const safeUsers: User[] = Array.isArray(users) ? users : [];

  const handleSubmit = (changeEvent: React.FormEvent<HTMLFormElement>) => {
    changeEvent.preventDefault();

    if (!title.trim()) {
      setTitleErrorMessage('Please enter a title');
    }

    if (!userId) {
      setUserErrorMessage('Please choose a user');
    }

    if (!title.trim() || !userId) {
      return;
    }

    if (safeUsers.length === 0) {
      setUserErrorMessage('Users are not loaded yet');

      return;
    }

    onSubmit({
      id: generatedId,
      title,
      userId: userId || 0,
      completed: false,
      user: users.find(user => user.id === userId) || EMPTY_USER,
    });

    reset();
  };

  const handleChangeTitle = (
    changeEvent: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTitle(changeEvent.target.value);

    setTitleErrorMessage('');
  };

  const handleChangeUser = (
    changeEvent: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setUserId(Number(changeEvent.target.value));

    setUserErrorMessage('');
  };

  if (!Array.isArray(users) || safeUsers.length === 0) {
    return <div className="TodoForm--loading">Loading users…</div>;
  }

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="titleInput">
          Title:&nbsp;
          <input
            id="titleInput"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleChangeTitle}
          />
        </label>

        {titleErrorMessage && (
          <span className="error">{titleErrorMessage}</span>
        )}
      </div>

      <div className="field">
        <label htmlFor="userSelect">
          User:&nbsp;
          <select
            id="userSelect"
            data-cy="userSelect"
            value={userId}
            onChange={handleChangeUser}
          >
            <option value={0} disabled>
              Choose a user
            </option>
            {users.length > 0 &&
              users.map(userOption => (
                <option key={userOption.id} value={userOption.id}>
                  {userOption.name}
                </option>
              ))}
          </select>
        </label>

        {userErrorMessage && <span className="error">{userErrorMessage}</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
