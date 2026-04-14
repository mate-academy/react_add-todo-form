import './App.scss';
import { TodoList } from './components/TodoList';
import React, { useState } from 'react';
import { Todo } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [selectedUserId, setSelectedUserId] = useState(0);
  const [hasUsersError, setHasUsersError] = useState(false);

  const [todos, setTodos] = useState<Todo[]>(
    todosFromServer.map(todo => ({
      ...todo,
      user: usersFromServer.find(user => user.id === todo.userId)!,
    })),
  );

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    const cleanedValue = value.replace(/[^a-zA-Zа-яА-ЯіІїЇєЄ0-9 ]/g, '');

    setTitle(cleanedValue);
    setHasTitleError(false);
  };

  const handleUsersChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
    setHasUsersError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUsersError(!selectedUserId);

    if (!title || !selectedUserId) {
      return;
    }

    const maxId = todos.length ? Math.max(...todos.map(todo => todo.id)) : 0;

    const selectedUser = usersFromServer.find(
      u => u.id === Number(selectedUserId),
    );

    if (!selectedUser) {
      return;
    }

    const newTodo: Todo = {
      id: maxId + 1,
      title,
      completed: false,
      userId: selectedUserId,
      user: selectedUser,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);

    setTitle('');
    setSelectedUserId(0);
  };

  return (
    <div className="App section">
      <h1 className="title">Add todo form</h1>

      <form
        className="box"
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label className="label" htmlFor="title-input">
            Title:
          </label>

          <input
            id="title-input"
            className="input is-info"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />

          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label className="label" htmlFor="user-select">
            User:
          </label>

          <div className="control">
            <div className="select is-info">
              <select
                data-cy="userSelect"
                id="user-select"
                value={selectedUserId}
                onChange={handleUsersChange}
              >
                <option value={0} disabled>
                  Choose a user
                </option>

                {usersFromServer.map(user => (
                  <option value={user.id} key={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {hasUsersError && <span className="error">Please choose a user</span>}
        </div>

        <button
          className="button is-info is-rounded"
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <div>
        <TodoList todos={todos} />
      </div>
    </div>
  );
};
