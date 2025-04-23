import { useState } from 'react';
import { User } from '../../types/user';
import { Todo } from '../../types/todo';

type Props = {
  users: User[];
  todos: Todo[];
  onAddTodo: (todos: Todo) => void;
};

export const TodoForm: React.FC<Props> = ({ users, todos, onAddTodo }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [nameError, setNameError] = useState('');
  const [userError, setUserError] = useState('');

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
    setNameError('');
  }

  function handleUserChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setUserId(+event.target.value);
    setUserError('');
  }

  const titleValid = () => {
    if (title.trim() === '') {
      setNameError('Please enter a title');

      return false;
    }

    return true;
  };

  const userValid = () => {
    if (userId === 0) {
      setUserError('Please choose a user');

      return false;
    }

    return true;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isTitleValid = titleValid();
    const isUserValid = userValid();

    if (!isTitleValid || !isUserValid) {
      return;
    }

    const maxId = todos.reduce((max, { id }) => Math.max(max, id), 0);

    const newTodo: Todo = {
      id: maxId + 1,
      title,
      completed: false,
      userId,
    };

    if (nameError === '' || userError === '') {
      setTitle('');
      setUserId(0);
      onAddTodo(newTodo);
    }

    return;
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="post-title">Title: </label>
        <input
          id="post-title"
          type="text"
          data-cy="titleInput"
          placeholder="Please enter a title"
          value={title}
          onChange={handleTitleChange}
        />
        {nameError && <span className="error">{nameError}</span>}
      </div>

      <div className="field">
        <label htmlFor="user-id">User: </label>
        <select
          data-cy="userSelect"
          id="user-id"
          value={userId}
          onChange={handleUserChange}
        >
          <option value="0" disabled>
            Choose a user
          </option>
          {users.map((user: User) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        {userError && <span className="error">{userError}</span>}
        <div className="submit-button">
          <button type="submit" data-cy="submitButton">
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
