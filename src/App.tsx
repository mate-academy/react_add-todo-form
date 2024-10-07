import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { TodoList } from './components/TodoList';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const inititalTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [currentTitle, setCurrentTitle] = useState('');
  const [currentUserId, setCurrentUserId] = useState(0);
  const [wasSubmitted, setSubmitted] = useState(false);

  const isFormValid = () => {
    return currentTitle.trim().length > 0 && currentUserId > 0;
  };

  const resetForm = () => {
    setCurrentTitle('');
    setCurrentUserId(0);
    setSubmitted(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isFormValid()) {
      setSubmitted(true);

      const newTodo = {
        id: Math.max(...todos.map(todo => todo.id)) + 1,
        title: currentTitle,
        completed: false,
        userId: currentUserId,
        user: getUserById(currentUserId),
      };

      setTodos(currentTodos => [...currentTodos, newTodo]);

      resetForm();
    } else {
      setSubmitted(true);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            id="titleInput"
            type="text"
            data-cy="titleInput"
            value={currentTitle}
            onChange={e => setCurrentTitle(e.target.value)}
            placeholder="Enter a title"
          />
          {currentTitle.length === 0 && wasSubmitted && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            id="userSelect"
            data-cy="userSelect"
            value={currentUserId}
            onChange={e => setCurrentUserId(+e.target.value)}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {currentUserId === 0 && wasSubmitted && (
            <span className="error">Please choose a user</span>
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
