import { useState, ChangeEvent, FormEvent } from 'react';
import { User } from '../../types';

interface NewTodoFormProps {
  onAdd: (title: string, userId: number) => void;
  users: User[];
}

export const NewTodoForm: React.FC<NewTodoFormProps> = ({ onAdd, users }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState<number | ''>('');

  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const filtered = event.target.value.replace(
      /[^a-zA-Zа-яА-ЯіІїЇєЄ0-9 ]/g,
      '',
    );

    setTitle(filtered);

    if (titleError) {
      setTitleError('');
    }
  };

  const handleUserChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    setUserId(value ? Number(value) : '');

    if (userError) {
      setUserError('');
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let isValid = true;

    if (!title.trim()) {
      setTitleError('Please enter a title');
      isValid = false;
    }

    if (!userId) {
      setUserError('Please choose a user');
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    onAdd(title.trim(), userId as number);

    setTitle('');
    setUserId('');
    setTitleError('');
    setUserError('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="titleInput">Title</label>
        <input
          id="titleInput"
          data-cy="titleInput"
          type="text"
          placeholder="Enter todo title"
          value={title}
          onChange={handleTitleChange}
        />
        {titleError && <p>{titleError}</p>}
      </div>

      <div>
        <label htmlFor="userSelect">User</label>
        <select
          id="userSelect"
          data-cy="userSelect"
          value={userId}
          onChange={handleUserChange}
        >
          <option value="">Choose a user</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        {userError && <p>{userError}</p>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
