import './App.scss';
import { TodoList } from './components/TodoList';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import React, { useState } from 'react';

const getUserById = (userId: number) => {
  return usersFromServer.filter(user => user.id === userId)[0];
};

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [newTodos, setNewTodos] = useState<Todo[]>(todos);
  const [userId, setUserId] = useState(0);
  const [userIdError, setUserIdError] = useState(false);
  const [hasErrorTitle, setHasErrorTitle] = useState(false);
  const [title, setTitle] = useState('');

  const addTodo = ({ ...data }: Todo) => {
    setNewTodos(currentTodos => [...currentTodos, data]);
  };

  const getId = (listTodos: Todo[]) => {
    const maxId = Math.max(...listTodos.map(todo => todo.id));

    return maxId + 1;
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserIdError(false);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHasErrorTitle(false);
    setTitle(event.target.value);
  };

  const reset = () => {
    setTitle('');
    setUserId(0);
  };

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setHasErrorTitle(!title);
    setUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    addTodo({
      title,
      id: getId(newTodos),
      completed: false,
      userId,
      user: getUserById(userId),
    });

    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form method="POST" onSubmit={handleOnSubmit}>
        <div className="field">
          <label className="label" htmlFor="todo-title">
            Title:{' '}
          </label>
          <input
            placeholder="Enter a title"
            type="text"
            data-cy="titleInput"
            value={title}
            id="todo-title"
            onChange={handleTitleChange}
          />
          {hasErrorTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label className="label" htmlFor="todo-id">
            User:{' '}
          </label>
          <select
            id="todo-id"
            data-cy="userSelect"
            value={userId}
            onChange={handleUserIdChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userIdError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={newTodos} />
    </div>
  );
};
