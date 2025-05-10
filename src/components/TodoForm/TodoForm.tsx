import { useState } from 'react';
import users from '../../api/users';
import { Todo } from '../../types/todo';

type Props = {
  onSubmit: (todo: Todo) => void;
};

export const TodoForm: React.FC<Props> = ({ onSubmit }) => {
  //#region js
  const [input, setInput] = useState('');
  const [hasInputError, setHasInputError] = useState(false);

  const [userById, setUserById] = useState<number>(0);
  const [hasUserByIdError, setHasUserByIdError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setHasInputError(!input);
    setHasUserByIdError(!userById);

    if (!input || !userById) {
      return;
    }

    onSubmit({
      id: 0,
      title: input,
      completed: false,
      userId: userById,
    });

    setInput('');
    setUserById(0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setHasInputError(false);
  };

  const handleSelectorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserById(+e.target.value);
    setHasUserByIdError(false);
  };
  //#endregion

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      Title:
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          value={input}
          onChange={handleInputChange}
        />
        {hasInputError && <span className="error">Please enter a title</span>}
      </div>
      User:
      <div className="field">
        <select
          data-cy="userSelect"
          name="userId"
          value={userById}
          onChange={handleSelectorChange}
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

        {hasUserByIdError && (
          <span className="error">Please choose a user</span>
        )}
      </div>
      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
