import { useState } from 'react';
import { Post } from '../../types/Post';
import usersFromServer from '../../api/users';

type Props = {
  onSubmit: (post: Post) => void;
};

export const TodoForm: React.FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [user, setUser] = useState<number | null>(null);

  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUserId = parseInt(event.target.value, 10);

    setUser(isNaN(selectedUserId) ? null : selectedUserId);
    setHasUserError(false);
  };

  const validateForm = () => {
    let hasErrors = false;

    setHasTitleError(!title.trim());
    if (!title.trim()) {
      hasErrors = true;
    }

    setHasUserError(!user);
    if (!user) {
      hasErrors = true;
    }

    return !hasErrors;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (validateForm()) {
      const foundUser = usersFromServer.find(u => u.id === user);

      if (!foundUser) {
        setHasUserError(true);

        return;
      }

      const newPost: Post = {
        id: Math.max(0, ...usersFromServer.map(u => u.id)) + 1,
        title: title,
        user: foundUser,
        completed: false,
      };

      onSubmit(newPost);
      setTitle('');
      setUser(null);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter todo title"
        />

        {hasTitleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          value={user === null ? '0' : user}
          onChange={handleUserChange}
        >
          <option value="0">Choose a user</option>
          {usersFromServer.map(userFromServer => (
            <option key={userFromServer.id} value={userFromServer.id}>
              {userFromServer.name}
            </option>
          ))}
        </select>

        {hasUserError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
