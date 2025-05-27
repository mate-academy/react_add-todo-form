import { useState } from 'react';
import { Todo } from '../../types/Todo';
import users from '../../api/users';
import { getUserById } from '../../srvices/getUserById';

type Props = {
  onAdd: (todo: Todo) => void;
};

export const TodoForm: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [userId, setUser] = useState<number>(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const handleUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUser(+event.target.value);
    setHasUserError(false);
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserError(!userId);

    if (!title || userId === 0) {
      return;
    }

    const newPost = {
      id: 0,
      title: title,
      completed: false,
      userId: userId,
      user: getUserById(userId),
    };

    onAdd(newPost);

    setTitle('');
    setUser(0);
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          value={title}
          onChange={handleTitle}
          placeholder="title"
        />
        {hasTitleError && (
          <span className="error" data-cy="titleError">
            Please enter a title
          </span>
        )}
      </div>

      <div className="field">
        <select data-cy="userSelect" value={userId} onChange={handleUser}>
          <option value={0}>Choose a user</option>
          {[...users].map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        {hasUserError && (
          <span className="error" data-cy="userError">
            Please choose a user
          </span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
