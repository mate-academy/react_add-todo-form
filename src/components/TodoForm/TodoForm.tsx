import { FC, useState } from 'react';
import { Todo } from '../../types';
import usersFromServer from '../../api/users';
import { getUserById } from '../../App';

type Props = {
  onAdd: (newTodo: Todo) => void;
  maxId: number;
};

export const TodoForm: FC<Props> = ({ onAdd, maxId }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    let hasErrors = false;

    if (!title.trim()) {
      setTitleError(true);
      hasErrors = true;
    } else {
      setTitleError(false);
    }

    if (userId === 0) {
      setUserError(true);
      hasErrors = true;
    } else {
      setUserError(false);
    }

    if (hasErrors) {
      return;
    }

    const newTodo = {
      id: maxId + 1,
      title: title,
      completed: false,
      userId: userId,
      user: getUserById(userId),
    };

    onAdd(newTodo);
    setTitle('');
    setUserId(0);
  };

  const handleChangeTitle = (value: string) => {
    setTitle(value);
    if (titleError) {
      setTitleError(false);
    }
  };

  const handleChangeUserId = (value: number) => {
    setUserId(value);
    if (userError) {
      setUserError(false);
    }
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          data-cy="titleInput"
          value={title}
          onChange={e => handleChangeTitle(e.target.value)}
          placeholder="Enter a title"
        />
        {titleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="selectUser">User: </label>
        <select
          data-cy="userSelect"
          value={userId}
          onChange={e => handleChangeUserId(+e.target.value)}
        >
          <option value="0" disabled>
            Choose a user
          </option>
          {usersFromServer.map(user => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {userError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
