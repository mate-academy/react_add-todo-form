import React, { useState } from 'react';
import { Todo } from '../../Types/Todo';
import { User } from '../../Types/User';

interface Props {
  onAdd: (todo: Todo) => void;
  users: User[];
  max: number;
}

export const NewTodo: React.FC<Props> = ({ onAdd, users, max }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [id, setId] = useState(max);
  const [completed, setCompleted] = useState(false);

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
  };

  const add = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newTodo: Todo = {
      id: max + 1,
      title: title,
      userId: userId,
      completed: completed,
    };

    onAdd(newTodo);

    setUserId(0);
    setTitle('');
    setCompleted(false);

    setId(n => n + 1);
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={add} key={id}>
      <div className="field">
        Title:
        <input
          type="text"
          data-cy="titleInput"
          value={title}
          onChange={onTitleChange}
        />
        <span className="error">Please enter a title</span>
      </div>

      <div className="field">
        <label>
          User:
          <select data-cy="userSelect" value={userId} onChange={onUserIdChange}>
            <option defaultValue="0" disabled>
              Choose a user
            </option>
            {users.map(person => (
              <option value={person.id} key={person.id}>
                {person.name}
              </option>
            ))}
          </select>
          {<span className="error">Please choose a user</span>}
        </label>
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
