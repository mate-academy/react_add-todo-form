import React, { useState } from 'react';
import { ServerTodo } from '../../Types/ServerTodo';
import users from '../../api/users';

type Props = {
  setValidTodos: (todos: ServerTodo[]) => void;
  validTodos: ServerTodo[];
};

export const TodoForm: React.FC<Props> = ({ validTodos, setValidTodos }) => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [userError, setUserError] = useState(false);

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
    setTitleError(false);
  }

  function handleUserChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setUserId(+event.target.value);
    setUserError(false);
  }

  function handleSubmit(event:React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setTitleError(!title);
    setUserError(!userId);

    if (!title || !userId) {
      return;
    }

    const newTodo = {
      id: Math.max(...validTodos.map(el => el.id)) + 1,
      title,
      userId,
      completed: false,
    };

    setValidTodos([...validTodos, newTodo]);
    setTitle('');
    setUserId(0);
  }

  return (
    <form
      onSubmit={handleSubmit}
    >
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={title}
          onChange={handleTitleChange}
        />
        {titleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          value={userId}
          onChange={handleUserChange}
        >
          <option value="0" disabled>Choose a user</option>
          {users.map(user => (
            <option
              key={user.id}
              value={user.id}
            >
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
