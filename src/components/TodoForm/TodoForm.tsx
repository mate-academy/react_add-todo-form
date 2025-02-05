import { useState } from 'react';
import { Post } from '../../types/Post';
import { User } from '../../types/User';

type Props = {
  onSubmit: (post: Post) => void;
  users: User[];
  posts: Post[];
};

export const TodoForm: React.FC<Props> = ({ onSubmit, users, posts }) => {
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
      const foundUser = users.find((u: User) => u.id === user);

      if (!foundUser) {
        setHasUserError(true);

        return;
      }

      const maxId = Math.max(0, ...posts.map(todo => todo.id));

      const newPost: Post = {
        id: maxId + 1,
        title: title,
        user: foundUser,
        completed: false,
        userId: foundUser.id,
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
          {users.map((userFromServer: User) => (
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
