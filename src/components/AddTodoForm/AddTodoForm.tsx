import { useState } from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  users: User[];
  onSubmit: (todo: Omit<Todo, 'id'>) => void;
};

export const AddTodoForm = ({ users, onSubmit }: Props) => {
  const [title, setTitle] = useState('');
  const [showTitleError, setShowTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [showUserIdError, setShowUserIdError] = useState(false);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    setShowTitleError(false);
  };

  const handleUserChange = (value: number) => {
    setUserId(value);
    setShowUserIdError(false);
  };

  const addButton = (event: React.FormEvent) => {
    event.preventDefault();

    setShowTitleError(!title);
    setShowUserIdError(!userId);

    if (userId === 0 || title === '') {
      return;
    }

    const newTodo = {
      title,
      completed: false,
      userId: userId,
    };

    onSubmit(newTodo);
    setTitle('');
    setUserId(0);
    setShowTitleError(false);
    setShowUserIdError(false);
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={addButton}>
      <div className="field">
        <label htmlFor="title-input">Title: </label>
        <input
          id="title-input"
          type="text"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={title}
          onChange={event => handleTitleChange(event.target.value)}
        />
        {showTitleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="select-input">User: </label>
        <select
          id="select-input"
          data-cy="userSelect"
          value={userId}
          onChange={event => handleUserChange(+event.target.value)}
        >
          <option value="0" disabled>
            Choose a user
          </option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        {showUserIdError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
