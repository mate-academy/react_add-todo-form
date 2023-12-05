import { FC, useState } from 'react';
import { User } from '../../types/interfaces';

type Props = {
  addTodo: (
    todoTitle: string,
    userId: number,
    completed: boolean,
  ) => void;
  users: User[],
};

export const AddPostForm: FC<Props> = ({ addTodo, users }) => {
  const [title, setTitle] = useState('');
  const [selectedId, setSelectedId] = useState(0);
  const [isCompleted] = useState(false);

  const [isInputError, setIsInputError] = useState('');
  const [isSelectError, setIsSelectError] = useState('');

  const clearForm = () => {
    setTitle('');
    setSelectedId(0);
    setIsInputError('');
    setIsSelectError('');
  };

  const isValid = !title.trim() || !selectedId;
  const isInputvalid = isInputError && !title;
  const isSelectvalid = isSelectError && selectedId === 0;

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isValid) {
      setIsInputError('Please enter a title');
      setIsSelectError('Please choose a user');

      return;
    }

    addTodo(title, selectedId, isCompleted);

    clearForm();
  };

  return (
    <form
      onSubmit={onSubmit}
      action="/api/todos"
      method="POST"
    >
      <div className="field">
        <label htmlFor="form-title">Title: </label>
        <input
          type="text"
          id="form-title"
          data-cy="titleInput"
          value={title}
          onChange={event => setTitle(event.target.value)}
          placeholder="Enter a title"
        />
        {isInputvalid && (
          <span className="error">{isInputError}</span>
        )}

      </div>

      <div className="field">
        <label htmlFor="form-select-user">User: </label>
        <select
          id="form-select-user"
          data-cy="userSelect"
          value={selectedId}
          onChange={event => setSelectedId(+event.target.value)}
        >
          <option
            value="0"
            disabled
          >
            Choose a user
          </option>
          {users.map(user => (
            <option
              key={user.id}
              value={user.id}
            >
              {user.name}
            </option>
          ))}
        </select>

        {isSelectvalid && (
          <span className="error">{isSelectError}</span>
        )}
      </div>

      <button
        type="submit"
        data-cy="submitButton"
      >
        Add
      </button>
    </form>
  );
};
