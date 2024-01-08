import React, { useState } from 'react';
import users from '../api/users';
import { Todo } from '../types/Todo';
import { User } from '../types/User';
import { getUserById } from '../services/user';

type Props = {
  onSubmit: (todo: Todo) => void;
  todoList: Todo[];
};

const getNewId = (todos: Todo[]): number => {
  return Math.max(...todos.map(el => el.id), 0) + 1;
};

export const Render: React.FC<Props> = ({ todoList, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [user, setUser] = useState('');
  const [hasUserError, setHasUserError] = useState(false);

  const reset = () => {
    setTitle('');
    setUser('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    setHasTitleError(!trimmedTitle);
    setHasUserError(!user);

    if (!trimmedTitle || !user) {
      return;
    }

    const newTodo: Todo = {
      id: getNewId(todoList),
      title: trimmedTitle,
      completed: false,
      userId: +user,
      user: getUserById(+user),
    };

    onSubmit(newTodo);

    reset();
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUser(event.target.value);
    setHasUserError(false);
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
            setHasTitleError(false);
          }}
        />

        {hasTitleError && (
          <span className="error">Please enter a title</span>
        )}
      </div>

      <div className="field">
        <select
          value={user}
          data-cy="userSelect"
          onChange={handleUserChange}
        >
          <option value="" disabled>Choose a user</option>

          {users.map((el: User) => (
            <option
              value={el.id}
              key={el.id}
            >
              {el.name}
            </option>
          ))}
        </select>

        {hasUserError && user === '' && (
          <span className="error">Please choose a user</span>
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
