import { useState } from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  allUsers: User[],
  setTodoList: (todo: Todo) => void,
  maxId: number,
};

export const TodoForm: React.FC<Props> = (
  { allUsers, setTodoList, maxId },
) => {
  const id = maxId + 1;
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title.trim() && userId) {
      setTodoList({
        id,
        title,
        completed: false,
        userId,
      });

      setTitleError(false);
      setUserError(false);

      return;
    }

    if (!title) {
      setTitleError(true);
    }

    if (!userId) {
      setUserError(true);
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value.trim()) {
      setTitleError(true);
    } else {
      setTitleError(false);
    }

    setTitle(event.target.value.trim());
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (!+event.target.value) {
      setUserError(true);
    } else {
      setUserError(false);
    }

    setUserId(+event.target.value);
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={handleOnSubmit}
    >
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          value={title}
          onChange={handleTitleChange}
        />

        {titleError && (<span className="error">Please enter a title</span>)}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          value={userId}
          onChange={handleUserChange}
        >
          <option value="0" disabled>Choose a user</option>
          {allUsers.map(user => (
            <option value={user.id} key={user.id}>{user.name}</option>
          ))}
        </select>

        {userError && (<span className="error">Please choose a user</span>)}
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
