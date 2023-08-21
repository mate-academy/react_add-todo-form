import React, { useState } from 'react';
import usersFromServer from '../api/users';
import { Todo } from '../types/types';

type Props = {
  onAdd: (todo: Todo) => void,
};

function getUser(userId: number) {
  return usersFromServer.find(user => user.id === userId)
    || null;
}

const TodoTemplate = {
  id: 0,
  title: '',
  completed: false,
  user: null,
};

export const TodoForm: React.FC<Props> = ({ onAdd }) => {
  const [todo, setTodo] = useState<Todo>(TodoTemplate);

  const [isFilled, setIsFilled] = useState(true);
  // const [touched, setTouched] = useState(false);

  const resetForm = () => {
    setTodo(TodoTemplate);

    setIsFilled(true);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(
      { ...todo, title: event.target.value },
    );
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTodo(
      {
        ...todo,
        user: getUser(+event.target.value),
      },
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!todo.title || !todo.user?.id) {
      setIsFilled(false);

      return;
    }

    onAdd(todo);
    resetForm();
  };

  const hasErrorTitle = !todo.title.trim() && !isFilled;
  const hasErrorUserId = !todo.user && !isFilled;

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="field">
        <label htmlFor="todo-title" className="title is-4">
          Title
        </label>

        <input
          id="todo-title"
          type="text"
          name="todo-title"
          data-cy="titleInput"
          className="input is-primary is-normal"
          placeholder="Please enter a title"
          value={todo.title}
          onChange={handleTitleChange}
          // onBlur={() => setTouched(true)}
        />

        {hasErrorTitle && (
          <div className="icon-text">
            <span className="icon has-text-danger">
              <i className="fas fa-ban" />
            </span>
            <span>You do not enter a title</span>
          </div>
        )}
      </div>

      <div className="field">
        <label htmlFor="todo-user" className="title is-4">
          User
        </label>

        <div className="select">
          <select
            name="todo-user"
            data-cy="userSelect"
            id="todo-user"
            value={todo.user ? todo.user.id : 0}
            onChange={handleUserIdChange}
            // onBlur={() => setTouched(true)}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>
        </div>

        {hasErrorUserId && (
          <div className="icon-text">
            <span className="icon has-text-danger">
              <i className="fas fa-ban" />
            </span>
            <span>You do not choose a user</span>
          </div>
        )}
      </div>

      <button
        type="submit"
        data-cy="submitButton"
        className="button is-primary"
        // disabled={!isValid}
      >
        Add
      </button>
    </form>
  );
};
