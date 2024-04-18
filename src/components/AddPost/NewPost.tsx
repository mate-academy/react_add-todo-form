import React, { useState } from 'react';
import { Todo } from '../../Types/Todo';
import { User } from '../../Types/User';

type Props = {
  onAdd: (todo: Todo) => void;
  users: User[];
  todos: Todo[];
};

export const NewPost: React.FC<Props> = ({ onAdd, users, todos }) => {
  const usersToUse = [
    { id: 0, name: 'Choose a user', username: '', email: '' },
    ...users,
  ];
  const [title, setTitle] = useState('');
  const [id, setId] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [userId, setUserId] = useState(0);
  const [user, setUser] = useState(usersToUse[0]);
  const [count, setCount] = useState(0);

  const handleTitleChange = (value: string) => {
    setTitle(value);
  };

  const handleUserChange = (value: string) => {
    setUser(users.find(user0 => user0.name === value) as User);
    setUserId(user.id);
    setId(Math.max(...todos.map(todo => todo.id)) + 1);
    setCompleted(false);
  };

  const reset = () => {
    setTitle('');
    setUser(usersToUse[0]);
    setCount(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setCount(count + 1);

    if (!title || user.id === 0 || title.trim() === '') {
      return;
    }

    onAdd({
      id,
      title,
      completed,
      userId,
      user,
    });

    reset();
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={handleSubmit}
      onReset={reset}
      noValidate
    >
      <div className="field">
        <label htmlFor="Title">
          Title:{' '}
          <input
            name="Title"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={event => handleTitleChange(event.target.value)}
            required={true}
            placeholder="Enter a title"
          />
        </label>

        {title === '' && count !== 0 ? (
          <span className="error">Please enter a title</span>
        ) : (
          ''
        )}
      </div>

      <div className="field">
        <label htmlFor="User">
          User:{' '}
          <select
            name="User"
            data-cy="userSelect"
            onChange={event => handleUserChange(event.target.value)}
            required={true}
            value={user.name}
          >
            {usersToUse.map(currentUser => (
              <option
                key={currentUser.id}
                value={currentUser.name}
                disabled={currentUser.id === 0}
              >
                {currentUser.name}
              </option>
            ))}
          </select>
        </label>

        {user.id === 0 && count !== 0 ? (
          <span className="error">Please choose a user</span>
        ) : (
          ''
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
