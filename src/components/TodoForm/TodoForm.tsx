import { useState } from 'react';
import users from '../../api/users';
import { Todo } from '../../types/Todo';

interface Props {
  onSubmit: (todo: Todo) => void;
}

export const TodoForm: React.FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setTitleError] = useState(false);
  const [userId, setUserId] = useState(0);
  const [hasUserError, setUserError] = useState(false);

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();

    setTitleError(!title);
    setUserError(!userId);

    if (!title || !userId) {
      return;
    }

    const newTodo = {
      title,
      userId,
      completed: false,
      user: users.find(user => user.id === userId) || null,
      id: 0,
    };

    onSubmit(newTodo);

    setTitle('');
    setUserId(0);
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleAdd}>
      <div className="field">
        <label htmlFor="user-id">Title: </label>

        <input
          type="text"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={title}
          onChange={event => {
            setTitle(event.target.value);
            setTitleError(false);
          }}
        />

        {hasTitleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="user-id">User: </label>

        <select
          id="user-id"
          required
          value={userId}
          data-cy="userSelect"
          onChange={event => {
            setUserId(+event.target.value);
            setUserError(false);
          }}
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

        {hasUserError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
