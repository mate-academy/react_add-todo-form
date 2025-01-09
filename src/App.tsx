import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { getHigherId } from './serveses/todos';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export const App = () => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState('');

  const [selectedUserId, setSelectedUserId] = useState(0);
  const [hasUserError, setHasUserError] = useState('');

  const [todos, setTodos] = useState(todosFromServer);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError('');
  };

  const handlUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
    setHasUserError('');
  };

  const addTodo = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) {
      setHasTitleError('Please enter a title');
    }

    if (!selectedUserId) {
      setHasUserError('Please choose a user');
    }

    if (!title || !selectedUserId) {
      return;
    }

    setTodos(currentTodos => {
      const todo = {
        id: getHigherId(todos),
        title,
        completed: false,
        userId: +selectedUserId,
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

          {hasTitleError && <span className="error">{hasTitleError}</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={handlUser}
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

          {hasUserError && <span className="error">{hasUserError}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} users={usersFromServer} />
    </div>
  );
};
