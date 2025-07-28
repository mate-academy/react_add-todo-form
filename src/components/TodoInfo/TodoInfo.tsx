import { Todo, User } from '../TodoList';
import React, { useState } from 'react';

type Props = {
  users: User[];
  createNewTodo: (todo: Todo) => void;
  todos: Todo[];
};

export const TodoInfo: React.FC<Props> = ({ users, createNewTodo, todos }) => {
  const [userSelect, setUserSelect] = useState('');
  const [hasUserSelectError, setHasUserSelectError] = useState(false);
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newTodo = {
      id: Math.max(...todos.map(t => t.id), 0) + 1,
      title: title.trim(),
      completed: false,
      userId: users.find(user => user.name === userSelect)?.id || 0,
      user: users.find(user => user.name === userSelect),
    };

    const isTitleEmpty = !title.trim();
    const isUserNotSelected = !userSelect;

    setHasTitleError(isTitleEmpty);
    setHasUserSelectError(isUserNotSelected);

    if (isTitleEmpty || isUserNotSelected) {
      return;
    }

    createNewTodo(newTodo);

    setTitle('');
    setUserSelect('');
  };

  return (
    <>
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            onChange={handleTitleChange}
            value={title}
            placeholder="Enter a title"
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userSelect}
            onChange={event => {
              setUserSelect(event.target.value);
              setHasUserSelectError(false);
            }}
          >
            <option value="" disabled>
              Choose a user
            </option>
            {users.map(user => (
              <option key={user.id} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>

          {hasUserSelectError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
    </>
  );
};
