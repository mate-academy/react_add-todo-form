import { useState } from 'react';
import { User } from '../../types/User';
import { NewTodo } from '../../types/NewTodo';

interface Props {
  addTodo: (newTodo: NewTodo) => void;
  users: User[];
}

export const NewTodoForm = ({ addTodo, users }: Props) => {
  const [title, setTitle] = useState('');
  const [isTitleHasError, setisTitleHasError] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [isSelectHasError, setSelectHasError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setisTitleHasError(false);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
    setSelectHasError(false);
  };

  const isNewTodoHasErrors = (trimmedTitle: boolean, userId: number) => {
    if (trimmedTitle && !userId) {
      setisTitleHasError(true);
      setSelectHasError(true);

      return true;
    }

    if (trimmedTitle) {
      setisTitleHasError(true);

      return true;
    }

    if (!userId) {
      setSelectHasError(true);

      return true;
    }

    return false;
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = !title.trim();

    if (isNewTodoHasErrors(trimmedTitle, selectedUserId)) {
      return;
    }

    addTodo({
      title: title,
      completed: false,
      userId: selectedUserId,
    });
    setTitle('');
    setSelectedUserId(0);
  };

  return (
    <form onSubmit={handleFormSubmit} action="/api/todos" method="POST">
      <div className="field">
        {'Title: '}
        <input
          type="text"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={title}
          onChange={handleTitleChange}
        />
        {isTitleHasError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        {'User: '}
        <select
          data-cy="userSelect"
          value={selectedUserId}
          onChange={handleSelectChange}
        >
          <option value="0" disabled>
            Choose a user
          </option>
          {users.map(user => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {isSelectHasError && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
