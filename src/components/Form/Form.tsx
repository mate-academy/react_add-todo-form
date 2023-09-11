import React, { useState } from 'react';
import todosFromServer from '../../api/todos';
import { User } from '../../interfaces/user';
import { Todo } from '../../interfaces/todo';

interface Props {
  users: User[];
  addTodo: (todo: Todo) => void;
}

export const Form: React.FC<Props> = ({ users, addTodo }) => {
  const [title, setTitle] = useState('');
  const [titleInvalid, setTitleInvalid] = useState(false);

  const [userId, setUserId] = useState(0);
  const [userIdInvalid, setUserIdInvalid] = useState(false);

  const [id, setId] = useState(Math.max(
    ...todosFromServer.map(todo => todo.id),
  ) + 1);

  const fieldChange = (value: string) => {
    setTitle(value);
    setTitleInvalid(false);
  };

  const selectChange = (value: number) => {
    setUserId(value);
    setUserIdInvalid(false);
  };

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title.length === 0 || !title.trim()) {
      setTitleInvalid(true);
    }

    if (userId === 0) {
      setUserIdInvalid(true);
    }

    if (title.length > 0 && userId > 0) {
      setId(prev => prev + 1);

      const newTodo: Todo = {
        id,
        title,
        completed: false,
        userId,
      };

      addTodo(newTodo);
      setTitle('');
      setTitleInvalid(false);
      setUserId(0);
      setUserIdInvalid(false);
    }
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={submitForm}
    >
      <div className="field">
        <label htmlFor="title">Title:</label>

        <input
          name="title"
          type="text"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={title}
          onChange={({ target }) => fieldChange(target.value)}
        />

        {titleInvalid && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="userId">User:</label>

        <select
          name="userId"
          data-cy="userSelect"
          value={userId}
          onChange={({ target }) => selectChange(+target.value)}
        >
          <option value="0" disabled>Choose a user</option>
          {users.map(user => (
            <option value={user.id} key={user.id}>{user.name}</option>
          ))}
        </select>

        {userIdInvalid && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
