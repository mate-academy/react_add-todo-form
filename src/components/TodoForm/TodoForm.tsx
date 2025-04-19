import { useState } from 'react';
import { getAllUsers, getUserById } from '../../service/UserService';
import { Todo } from '../../types/Todo';

type Props = {
  onSubmit: (todo: Todo) => void;
};
export const TodoForm: React.FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasSelectError, setSelectError] = useState(false);

  const resetForm = () => {
    setTitle('');
    setUserId(0);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setSelectError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    setTitleError(!trimmedTitle);
    setSelectError(!userId);

    if (!trimmedTitle || !userId) {
      return;
    }

    onSubmit({
      id: 0,
      title: trimmedTitle,
      completed: false,
      user: getUserById(userId),
      userId,
    });

    resetForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="titleInput">
          Title:&nbsp;
          <input
            type="text"
            id="titleInput"
            data-cy="titleInput"
            value={title}
            placeholder="Enter a title"
            onChange={handleTitleChange}
          />
        </label>
        {hasTitleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="userSelect">
          User:&nbsp;
          <select
            id="userSelect"
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
          >
            <option value="0">Choose a user</option>

            {getAllUsers().map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </label>
        {hasSelectError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
