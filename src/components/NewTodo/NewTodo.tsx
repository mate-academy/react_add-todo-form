import { FC, FormEvent, useState } from 'react';
import { User } from '../../utils/types';

type Props = {
  onAdd: (title: string, userId: number) => void;
  users: User[];
};
export const NewTodo: FC<Props> = ({ onAdd, users }) => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');
  const [userId, setUserId] = useState(0);
  const [userError, setUserError] = useState('');

  const handleChange = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
    field: string,
  ) => {
    const value = event.target.value;

    switch (field) {
      case 'userId':
        setUserId(+value);
        setUserError('');
        break;
      case 'title':
        const sanitizedTitle = value.replace(
          /[^a-zA-Zа-яА-ЯґҐїЇєЄіІ0-9 ]/g,
          '',
        );

        setTitle(sanitizedTitle);
        setTitleError('');
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setTitleError('Please enter a title');
    }

    if (userId === 0) {
      setUserError('Please choose a user');
    }

    if (!trimmedTitle || userId === 0) {
      return;
    }

    onAdd(trimmedTitle, userId);
    setTitle('');
    setUserId(0);
    setTitleError('');
    setUserError('');
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label className="label" htmlFor="todo-title">
          Title:
        </label>
        <input
          id="todo-title"
          type="text"
          data-cy="titleInput"
          value={title}
          onChange={event => handleChange(event, 'title')}
          placeholder="Enter a title"
        />
        {titleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label className="label" htmlFor="todo-user">
          User:
        </label>

        <select
          id="todo-user"
          data-cy="userSelect"
          value={userId}
          onChange={event => handleChange(event, 'userId')}
        >
          <option value={0}>Choose a user</option>
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
