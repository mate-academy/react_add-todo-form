import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { TodoList } from './components/TodoList';

export const App: React.FC = () => {
  const [currentTitle, setCurrentTitle] = useState('');
  const [currentUserId, setCurrentUserId] = useState(0);
  const [todos, setTodos] = useState(todosFromServer);
  const [wasSubmitted, setWasSubmitted] = useState(false);

  const isFormValid = currentTitle.trim() && currentUserId;

  const formReset = () => {
    setCurrentTitle('');
    setCurrentUserId(0);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isFormValid) {
      const newTodo = {
        id: Math.max(...todos.map(todo => todo.id)) + 1,
        title: currentTitle,
        userId: currentUserId,
        completed: false,
        user: usersFromServer.find(user => user.id === currentUserId) || '',
      };

      setTodos([...todos, newTodo]);

      formReset();
    } else {
      setWasSubmitted(true);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={onSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            name="title"
            id="titleInput"
            value={currentTitle}
            onChange={event => setCurrentTitle(event.target.value)}
            placeholder="Enter a title"
          />
          {wasSubmitted && !currentTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            data-cy="userSelect"
            name="user"
            id="userSelect"
            value={currentUserId}
            onChange={event => setCurrentUserId(+event.target.value)}
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

          {wasSubmitted && !currentUserId && (
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
