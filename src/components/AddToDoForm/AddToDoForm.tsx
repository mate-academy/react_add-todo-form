import { ChangeEvent, useState } from 'react';
import { User } from '../../types';

type Props = {
  addTodo: (title: string, userId: number) => void;
  users: User[];
};

const titleValidation = new RegExp(/[^a-zA-Z0-9 ]/g); // Regex expression for title validation

export const AddToDoForm: React.FC<Props> = ({ addTodo, users }) => {
  const [newTitle, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [hasTitleError, setTitleError] = useState(false);
  const [hasUserError, setUserError] = useState(false);

  const resetForm = () => {
    setTitle('');
    setUserId(0);
  };

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newTitle) {
      setTitleError(true);
    }

    if (!userId) {
      setUserError(true);
    }

    if (!newTitle || !userId) {
      return;
    }

    addTodo(newTitle, userId);
    resetForm();
  };

  const validateTitle = (title: string) => {
    if (title) {
      setTitle(title.replace(titleValidation, ''));
    }
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    validateTitle(event.target.value);
    setTitleError(false);
  };

  const handleUserChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserError(false);
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmitForm}>
      <div className="field">
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          placeholder="Enter a title"
          name="title"
          data-cy="titleInput"
          value={newTitle}
          onChange={event => {
            handleTitleChange(event);
          }}
        />

        {hasTitleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="user">User: </label>
        <select
          name="user"
          data-cy="userSelect"
          value={userId}
          onChange={event => {
            handleUserChange(event);
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

        {hasUserError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
