import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [userError, setUserError] = useState('');
  const [titleError, setTitleError] = useState('');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError('');
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(event.target.value);
    setUserError('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!userId) {
      setUserError('Please choose a user');
    }

    if (!title) {
      setTitleError('Please enter a title');
    }

    if (userId && title) {
      const newTodo = {
        id: Math.max(...todos.map((todo) => todo.id)) + 1,
        title,
        userId: parseInt(userId, 10),
        completed: false,
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
            value={title}
            onChange={handleTitleChange}
            data-cy="titleInput"
            placeholder="Enter title"
          />
          <span className="error">{titleError}</span>
        </div>

        <div className="field">
          <select
            value={userId}
            onChange={handleUserChange}
            data-cy="userSelect"
          >
            <option value="" disabled>
              Choose a user
            </option>
            {usersFromServer.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          <span className="error">{userError}</span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
