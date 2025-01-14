import { User } from '../TodoList';
import { Todo } from '../TodoList';
import React, { useState } from 'react';

interface Props {
  users: User[];
  todos: Todo[];
  addFunc: (newTodo: Todo) => void;
}

export const Form: React.FC<Props> = ({ users, todos, addFunc }) => {
  const [title, setTitle] = useState('');

  const [userId, setUserId] = useState(0);

  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  function onSubmitChacge(event: React.FormEvent) {
    event.preventDefault();

    if (!title) {
      setTitleError(true);
    } else {
      setTitleError(false);
    }

    if (!userId) {
      setUserError(true);
    } else {
      setUserError(false);
    }

    if (title && userId) {
      addFunc({
        id: Math.max(...todos.map(todo => todo.id)) + 1,
        title: title,
        completed: false,
        userId: userId,
      });

      setTitle('');
      setUserId(0);
    }

    return;
  }

  return (
    <form action="/api/todos" method="POST" onSubmit={onSubmitChacge}>
      <div className="field">
        <label htmlFor="title">
          Title: {''}
          <input
            name="title"
            value={title}
            type="text"
            data-cy="titleInput"
            placeholder="Enter ad title"
            onChange={event => setTitle(event.target.value)}
          />
          {titleError && !title && (
            <span className="error">Please enter a title</span>
          )}
        </label>
      </div>

      <div className="field">
        <label htmlFor="">
          User: {''}
          <select
            data-cy="userSelect"
            value={userId}
            onChange={event => {
              const selectedId = Number(event.target.value);
              const selectedUser = users.find(user => user.id === selectedId);

              if (selectedUser) {
                setUserId(selectedUser.id);
              }
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {users.map(user => {
              return (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>
        </label>
        {userError && userId === 0 && (
          <span className="error">Please choose a user</span>
        )}
      </div>
      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
