import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { getHigherId } from './serveses/todos';
import { getUserById } from './serveses/user';

import { User } from './serveses/types';

const completedTodos = todosFromServer.map(todo => {
  const user = getUserById(usersFromServer, todo.userId);

  return {
    ...todo,
    user,
  };
});

export const App = () => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [selectedUserId, setSelectedUserId] = useState(0);
  const [hasUserError, setHasUserError] = useState(false);

  const [todos, setTodos] = useState(completedTodos);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
    setHasUserError(false);
  };

  const addTodo = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) {
      setHasTitleError(true);
    }

    if (!selectedUserId) {
      setHasUserError(true);
    }

    if (!title || !selectedUserId) {
      return;
    }

    setTodos(currentTodos => {
      const user = getUserById(usersFromServer, selectedUserId);

      const todo = {
        id: getHigherId(todos),
        title,
        completed: false,
        userId: +selectedUserId,
        user,
      };

      return [...currentTodos, todo];
    });

    setTitle('');
    setSelectedUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form action="/api/todos" method="POST" onSubmit={addTodo}>
        <div className="field">
          <label htmlFor="title">
            <span className="field__title">Title:</span>
            <input
              type="text"
              id="title"
              data-cy="titleInput"
              value={title}
              placeholder="Title"
              onChange={handleTitle}
            />
          </label>

          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={handleUser}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map((user: User) => {
              return (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>

          {hasUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
