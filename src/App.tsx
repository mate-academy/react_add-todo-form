import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todos } from './components/types';

function getUserById(userId: number) {
  return usersFromServer.find(user => user?.id === userId) || null;
}

const todosWithUsers: Todos[] = todosFromServer.map(todo => {
  return {
    ...todo,
    user: getUserById(todo.userId),
  };
});

export const App = () => {
  const [todos, setTodos] = useState(todosWithUsers);

  const [userId, setUserId] = useState(0);
  const [userErrorMessage, setUserErrorMessage] = useState('');
  const [title, setTitle] = useState('');
  const [titleErrorMessage, setTitleErrorMessage] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      setTitleErrorMessage('Please enter a title');
    }

    if (!userId) {
      setUserErrorMessage('Please choose a user');
    }

    if (!title.trim() || !userId) {
      return;
    }

    setTodos([
      ...todos,
      {
        id: Math.max(...todos.map(todo => todo.id)) + 1,
        title,
        userId,
        completed: false,
        user: getUserById(userId),
      },
    ]);

    setTitle('');
    setTitleErrorMessage('');
    setUserId(0);
    setUserErrorMessage('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>

          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={(event => {
              setTitle(event.target.value);
              setTitleErrorMessage('');
            })}
          />
          {titleErrorMessage && (
            <span className="error">{titleErrorMessage}</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userId">User: </label>

          <select
            id="userId"
            data-cy="userSelect"
            value={userId}
            onChange={event => {
              setUserId(+event.target.value);
              setUserErrorMessage('');
            }}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {userErrorMessage && (
            <span className="error">{userErrorMessage}</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
