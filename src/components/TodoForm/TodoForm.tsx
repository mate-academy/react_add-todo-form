import { useState } from 'react';

import { getAllUsers, getUserById } from '../../services/user';
import { isValidLetter } from '../../services/Pattern';
import { Todo } from '../../types/Todo';

interface Props {
  onAdd: (todo: Todo) => void;
  newTodoId: number;
}

export const TodoForm: React.FC<Props> = ({ onAdd, newTodoId }) => {
  const [count, setCount] = useState(0);

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const TitleTetters = event.target.value;

    if (isValidLetter(TitleTetters.slice(-1))) {
      setTitle(TitleTetters);
    } else {
      setTitle(TitleTetters.slice(0, -1));
    }

    setHasTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const reset = () => {
    setTitle('');
    setUserId(0);

    setHasTitleError(false);
    setHasUserIdError(false);

    setCount(count + 1);
  };

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    onAdd({
      id: newTodoId,
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    });

    reset();
  };

  return (
    <form action="/api/todos" method="POST" key={count} onSubmit={handleAdd}>
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={title}
          onChange={handleTitleChange}
        />
        {hasTitleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <select
          value={userId}
          data-cy="userSelect"
          onChange={handleUserIdChange}
        >
          <option value="0" disabled>
            Choose a user
          </option>

          {getAllUsers().map(user => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {hasUserIdError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
