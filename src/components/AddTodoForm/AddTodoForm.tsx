import { useState } from 'react';
// import usersFromServer from '../../api/users';
import { Todo } from '../domain/Todo';
import { Nullable } from '../domain/Nullable';
import { User } from '../domain/User';

type AddTodoFormProps = {
  onSubmit: (todo: Omit<Todo, 'id'>) => void;
  users: User[];
};

export const AddTodoForm = ({ onSubmit, users }: AddTodoFormProps) => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState<Nullable<string>>(null);

  const [userId, setUserId] = useState(0);
  const [userIdError, setUserIdError] = useState<Nullable<string>>(null);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;

    setTitle(newTitle);

    if (titleError) {
      setTitleError(null);
    }
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newUserId = +event.target.value;

    setUserId(newUserId);

    if (userIdError) {
      setUserIdError(null);
    }
  };

  const handleReset = () => {
    setTitle('');
    setUserId(0);
    setTitleError(null);
    setUserIdError(null);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const normalizeTitle = title.trim();

    const titleIsEmpty = !normalizeTitle;
    const userIsNotChosen = userId === 0;

    if (titleIsEmpty) {
      setTitleError('Please enter a title');
    }

    if (userIsNotChosen) {
      setUserIdError('Please choose a user');
    }

    if (titleIsEmpty || userIsNotChosen) {
      return;
    }

    onSubmit({
      title: normalizeTitle,
      completed: false,
      userId: userId,
    });
    handleReset();
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="titleInput">Title</label>
        <input
          type="text"
          data-cy="titleInput"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter a title"
          id="titleInput"
        />
        {titleError && <span className="error">{titleError}</span>}
      </div>

      <div className="field">
        <label htmlFor="userSelect">User</label>
        <select
          data-cy="userSelect"
          value={userId}
          onChange={handleUserIdChange}
          id="userSelect"
        >
          <option value={0} disabled>
            Choose a user
          </option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
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
