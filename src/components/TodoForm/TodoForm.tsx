import { useState } from 'react';
import { Todo } from '../../types/Todo';
import usersFromServer from '../../api/users';
import todosFromServer from '../../api/todos';

type Props = {
  onAdd: (value: Todo) => void
};

export const TodoForm: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  function onHandle(e: React.FormEvent) {
    e.preventDefault();

    if (!title) {
      setTitleError(true);
    }

    if (!userId) {
      setUserError(true);
    }

    if (title && userId) {
      onAdd({
        id: (Math.max(...todosFromServer.map(el => el.id)) + 1),
        title,
        completed: false,
        userId,
      });

      setTitle('');
      setUserId(0);
    }
  }

  return (
    <form action="/api/todos" method="POST" onSubmit={onHandle}>
      <div className="field">
        <label>
          Title:&nbsp;
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setTitleError(false);
            }}
          />
        </label>
        {titleError
          && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label>
          User:&nbsp;
          <select
            data-cy="userSelect"
            value={userId}
            onChange={((e) => {
              setUserId(+e.target.value);
              setUserError(false);
            })}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>
        </label>
        {userError && (
          <span className="error">Please choose a user</span>)}

      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
