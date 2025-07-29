import { useState } from 'react';
import { getAllUsers, getUserById } from '../../service/UserService';
import { Todo } from '../../types/Todo';

type Props = {
  setVisibleTodos: (value: React.SetStateAction<Todo[]>) => void;
  visibleTodos: Todo[];
};
export const TodoForm: React.FC<Props> = ({
  setVisibleTodos,
  visibleTodos,
}) => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setTitleError] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [userId, setUserId] = useState(0);
  const [hasSelectError, setSelectError] = useState(false);

  const resetForm = () => {
    setTitle('');
    setUserId(0);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setTitle(value);
    if (isTouched) setTitleError(value.trim().length === 0);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = +event.target.value;
    setUserId(value);
    if (isTouched) setSelectError(value === 0);
  };

  const largestId = (array: Todo[]): number => {
    const largestIdValue =
      array.length > 0
        ? array.reduce((max, item) => Math.max(max, item.id), 0)
        : 0;

    return largestIdValue;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsTouched(true);

    const trimmedTitle = title.trim();
    const localTitleError = trimmedTitle.length === 0;
    const localUserError = !userId;

    setTitleError(localTitleError);
    setSelectError(localUserError);

    if (localTitleError || localUserError) {
      return;
    }

    const newTodo = {
      id: largestId(visibleTodos) + 1,
      title: trimmedTitle,
      completed: false,
      userId,
      user: getUserById(userId),
    };

    setVisibleTodos(prev => [...(prev || []), newTodo]);
    resetForm();
    setIsTouched(false);
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
        {hasTitleError && isTouched && (
          <span className="error">Please enter a title</span>
        )}
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
        {hasSelectError && isTouched && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <button
        type="submit"
        data-cy="submitButton"
        onClick={e => handleSubmit(e)}
      >
        Add
      </button>
    </form>
  );
};
