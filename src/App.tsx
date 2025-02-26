import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const initialTodos = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId)!,
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;

    if (!title) {
      setTitleError(true);
      hasError = true;
    } else {
      setTitleError(false);
    }

    if (!userId) {
      setUserError(true);
      hasError = true;
    } else {
      setUserError(false);
    }

    if (!hasError) {
      const newTodo = {
        id: todos.length ? Math.max(...todos.map(t => t.id)) + 1 : 1,
        title,
        completed: false,
        userId: parseInt(userId),
        user: usersFromServer.find(user => user.id === parseInt(userId))!,
      };

      setTodos([...todos, newTodo]);
      setTitle('');
      setUserId('');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={e => {
              setTitle(e.target.value);
              setTitleError(false);
            }}
            placeholder="Enter title"
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={e => {
              setUserId(e.target.value);
              setUserError(false);
            }}
          >
            <option value="" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
