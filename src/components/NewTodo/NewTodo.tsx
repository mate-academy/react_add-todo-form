import { useState } from 'react';
import { User } from '../../types/User';

type NewTodoProps = {
  onAddTodo: (todo: { title: string; userId: number }) => void;
  users: User[];
};

export const NewTodo = ({ onAddTodo, users }: NewTodoProps) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [showTitleError, setShowTitleError] = useState(false);
  const [showUserError, setShowUserError] = useState(false);

  const isFormValid = title.trim() && userId !== 0;

  function handlerSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isFormValid) {
      setShowTitleError(title.trim() === '');
      setShowUserError(userId === 0);

      return;
    }

    onAddTodo({ title, userId });

    setTitle('');
    setShowTitleError(false);
    setUserId(0);
    setShowUserError(false);
  }

  return (
    <form onSubmit={handlerSubmit}>
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          value={title}
          placeholder="Title"
          onChange={event => {
            setTitle(event.target.value);
            setShowTitleError(false);
          }}
        />
        {showTitleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          value={userId}
          onChange={event => {
            setUserId(Number(event.target.value));

            setShowUserError(false);
          }}
        >
          <option value="0" disabled>
            Choose a user
          </option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {showUserError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
