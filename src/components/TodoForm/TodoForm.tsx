import { useState } from 'react';
import usersFromServer from '../../api/users';
import { Todo } from '../../types/Todo';
import { getUserByid } from '../../services/getUser';
import { pattern } from '../../services/pattern';

type Props = {
  todos: Todo[];
  setTodos: (callback: (todos: Todo[]) => Todo[]) => void;
};

export const TodoForm: React.FC<Props> = ({
  todos,
  setTodos,
}) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleError, setTitleError] = useState('');
  const [userIdError, setUserIdError] = useState('');

  const handleReset = () => {
    setTitle('');
    setUserId(0);
    setTitleError('');
    setUserIdError('');
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;

    const filteredInput = input
      .replace(pattern, '');

    setTitle(filteredInput);
    if (input !== filteredInput) {
      setTitleError(
        'Only letters (ua, en), numbers, and spaces are allowed',
      );
    } else {
      setTitleError('');
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!userId) {
      setUserIdError('Please choose a user');
    }

    if (!title) {
      setTitleError('Please enter a title');
    }

    if (!title || !userId) {
      return;
    }

    const id = Math.max(...todos.map(todo => todo.id)) + 1;

    const todo: Todo = {
      id,
      title,
      completed: false,
      userId,
      user: getUserByid(usersFromServer, userId),
    };

    setTodos(currentTodos => [...currentTodos, todo]);

    handleReset();
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="field">
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          data-cy="titleInput"
          id="title"
          placeholder="Enter a title"
          value={title}
          onChange={handleInputChange}
        />
        {titleError && (
          <span className="error">{titleError}</span>
        )}
      </div>

      <div className="field">
        <label htmlFor="userSelect">User: </label>
        <select
          data-cy="userSelect"
          id="userSelect"
          value={userId}
          onChange={(event) => {
            setUserId(+event.target.value);
            setUserIdError('');
          }}
        >
          <option value="0" disabled>Choose a user</option>
          {usersFromServer.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>

        {userIdError && (
          <span className="error">{userIdError}</span>
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
