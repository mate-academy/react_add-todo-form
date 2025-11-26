import React, { useState } from 'react';
import { User } from '../../App';

interface TodoFormProps {
  onAddTodo: (title: string, userId: number) => void;
  users: User[];
}

export const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo, users }) => {
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    const hasTitleError = !trimmedTitle;
    const hasUserError = selectedUserId === 0;

    setTitleError(hasTitleError);
    setUserError(hasUserError);

    if (!hasTitleError && !hasUserError) {
      onAddTodo(trimmedTitle, selectedUserId);
      setTitle('');
      setSelectedUserId(0);
      setTitleError(false);
      setUserError(false);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);

    if (titleError) {
      setTitleError(false);
    }
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(Number(e.target.value));

    if (userError) {
      setUserError(false);
    }
  };

  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <div className="field">
        <label className="label" htmlFor="todo-title">
          Title
        </label>
        <div className="control">
          <input
            id="todo-title"
            data-cy="titleInput"
            className="input"
            type="text"
            placeholder="Please enter a title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        {titleError && <div className="error">Please enter a title</div>}
      </div>

      <div className="field">
        <label className="label" htmlFor="user-select">
          User
        </label>
        <div className="control">
          <div className="select">
            <select
              id="user-select"
              data-cy="userSelect"
              value={selectedUserId}
              onChange={handleUserChange}
            >
              <option value={0}>Choose a user</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {userError && <div className="error">Please choose a user</div>}
      </div>

      <div className="field">
        <div className="control">
          <button
            type="submit"
            data-cy="submitButton"
            className="button is-primary"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
