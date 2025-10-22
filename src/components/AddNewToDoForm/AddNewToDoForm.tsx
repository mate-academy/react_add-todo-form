import { ChangeEvent, FormEvent, useState } from 'react';
import { User } from '../../domain/User';
import { Todo } from '../../domain/Todo';
import { Nullable } from '../../domain/Nullable';

type TodoFormProps = {
  users: User[];
  onSubmit: (todo: Omit<Todo, 'id'>) => void;
};

export const ToDoForm = ({ users, onSubmit }: TodoFormProps) => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState<Nullable<string>>(null);

  const [userId, setUserId] = useState<number>(0);
  const [userIdError, setUserIdError] = useState<Nullable<string>>(null);

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitleError(null);

    setTitle(event.target.value.trimStart());
  };

  const handleChangeUser = (event: ChangeEvent<HTMLSelectElement>) => {
    setUserIdError(null);

    setUserId(+event.target.value.trimStart());
  };

  const handleResetForm = () => {
    setTitle('');
    setTitleError(null);

    setUserId(0);
    setUserIdError(null);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedTitle = title.trim();

    setTitleError(null);
    setUserIdError(null);

    if (!normalizedTitle && userId === 0) {
      setTitleError('Please enter a title');
      setUserIdError('Please choose a user');

      return;
    }

    if (!normalizedTitle) {
      setTitleError('Please enter a title');

      return;
    }

    if (userId === 0) {
      setUserIdError('Please choose a user');

      return;
    }

    onSubmit({
      title: normalizedTitle,
      completed: false,
      userId: userId,
    });

    handleResetForm();
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <span>Title: </span>
        <input
          type="text"
          data-cy="titleInput"
          value={title}
          onChange={handleChangeTitle}
          placeholder="Enter a title"
        />
        {titleError && <span className="error">{titleError}</span>}
      </div>

      <div className="field">
        <span>User: </span>
        <select data-cy="userSelect" value={userId} onChange={handleChangeUser}>
          <option value="0" disabled>
            Choose a user
          </option>
          {users.map((user: User) => {
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
