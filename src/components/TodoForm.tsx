import { useState } from 'react';
import usersFromServer from '../api/users';
import { Todo } from '../types/Todo';
import { User } from '../types/User';

export function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

type Props = {
  addTodo: (todo: Omit<Todo, 'id'>) => void,
};

export const TodoForm: React.FC<Props> = ({ addTodo }) => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setTitleError] = useState(false);
  const [userId, setUserId] = useState(0);
  const [hasUserError, setUserError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setTitleError(!title);
    setUserError(!userId);

    if (!title || !userId) {
      return;
    }

    const todoData = {
      title,
      userId,
      completed: false,
      user: getUser(userId),
    };

    addTodo(todoData);

    setTitle('');
    setUserId(0);
  };

  return (
    <form action="/api/users" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label>
          {'Title: '}
          <input
            placeholder="Enter a title"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setTitleError(false);
            }}
          />
        </label>

        {hasTitleError && (
          <span className="error">Please enter a title</span>
        )}
      </div>

      <div className="field">
        <label>
          {'User: '}
          <select
            data-cy="userSelect"
            value={userId}
            onChange={event => {
              setUserId(+event.target.value);
              setUserError(false);
            }}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </label>

        {hasUserError && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
