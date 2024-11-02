import React, { useState } from 'react';
import { Todo, User } from '../../types';

interface Props {
  onAdd: (todo: Todo) => void;
  user: User[];
  todos: Todo[];
}

export const FormTodo: React.FC<Props> = ({ onAdd, user, todos }) => {
  const [title, setTitleValue] = useState('');
  const [name, setUserName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [titleError, setTitleError] = useState(false);

  const titleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleValue(event.target.value);
    if (titleError && event.target.value) {
      setTitleError(false);
    }
  };

  const nameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserName(event.target.value);
    if (nameError && event.target.value) {
      setNameError(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let hasError = false;

    if (!title.trim()) {
      setTitleError(true);

      hasError = true;
    } else {
      setTitleError(false);
    }

    if (name === '') {
      setNameError(true);
      hasError = true;
    } else {
      setNameError(false);
    }

    if (hasError) {
      return;
    }

    const maxId = Math.max(...todos.map(todo => todo.id), 0) + 1;

    const newTodo: Todo = {
      id: maxId,
      title: title,
      completed: false,
      userId: parseInt(name),
    };

    onAdd(newTodo);
    setTitleValue('');
    setUserName('');
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          value={title}
          onChange={titleChange}
          required
          placeholder="Enter a title"
        />
        {titleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <select
          required
          data-cy="userSelect"
          value={name}
          onChange={nameChange}
        >
          <option value="" disabled>
            Choose a user
          </option>
          {user.map(users => (
            <option value={users.id} key={users.id}>
              {users.name}
            </option>
          ))}
        </select>
        {nameError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
