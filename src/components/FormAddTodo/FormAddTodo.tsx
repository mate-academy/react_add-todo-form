import { useState } from 'react';
import usersFromServer from '../../api/users';
import { pattern } from '../../variables';

type FormAddTodoProps = {
  addTodo: (title: string, userId: number) => void;
};

export const FormAddTodo: React.FC<FormAddTodoProps> = ({ addTodo }) => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [title, setTitle] = useState('');

  const [titleError, setTitleError] = useState(false);
  const [selectError, setSelectError] = useState(false);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
      .split('').filter(char => pattern.test(char)).join('');

    setTitle(inputValue);

    if (inputValue.trim()) {
      setTitleError(false);
    }
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectValue = +event.target.value;

    setSelectedUserId(selectValue);

    if (selectValue) {
      setSelectError(false);
    }
  };

  const handleAdd = () => {
    if (!title.trim()) {
      setTitleError(true);
    }

    if (!selectedUserId) {
      setSelectError(true);
    }

    if (title && selectedUserId) {
      addTodo(title, selectedUserId);

      setTitle('');
      setSelectedUserId(0);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    handleAdd();
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="field">
        <label>
          Title:
          <input
            type="text"
            data-cy="titleInput"
            onChange={handleInput}
            value={title}
            placeholder="Enter a title"
          />
        </label>
        {titleError && (
          <span className="error">Please enter a title</span>
        )}
      </div>

      <div className="field">
        <label>
          User:
          <select
            data-cy="userSelect"
            onChange={handleSelect}
            value={selectedUserId}
          >
            <option
              key={0}
              value={0}
              disabled
            >
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
        </label>

        {selectError && (
          <span className="error">Please choose a user</span>
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
