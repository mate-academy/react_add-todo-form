import React, { useState } from 'react';
import './App.scss';

import todos from './api/todos';
import users from './api/users';
import { TodoList } from './components/TodoList';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export const App = () => {
  const [addedTodos, setAddedTodos] = useState(todos);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const cleanedTitle = event.target.value.replace(/[^a-zA-Z0-9\s]/g, '');

    setNewTodoTitle(cleanedTitle);
    setTitleError('');
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(parseInt(event.target.value));
    setUserError('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newTodoTitle.trim() === '') {
      setTitleError('Please enter a title');
    }

    if (selectedUserId === 0) {
      setUserError('Please choose a user');
    }

    if (newTodoTitle.trim() !== '' && selectedUserId !== 0) {
      const newTodoId =
        addedTodos.reduce(
          (maxId: number, todo: Todo) => Math.max(maxId, todo.id),
          0,
        ) + 1;
      const newTodo: Todo = {
        id: newTodoId,
        title: newTodoTitle,
        completed: false,
        userId: selectedUserId,
      };

      setAddedTodos([...addedTodos, newTodo]);
      setNewTodoTitle('');
      setSelectedUserId(0);
      setTitleError('');
      setUserError('');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title:</label>
          <input
            type="text"
            id="titleInput"
            value={newTodoTitle}
            onChange={handleTitleChange}
            data-cy="titleInput"
            placeholder="Enter a title"
          />
          {titleError && <span className="error">{titleError}</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User:</label>
          <select
            id="userSelect"
            value={selectedUserId}
            onChange={handleUserChange}
            data-cy="userSelect"
          >
            <option value={0} disabled>
              Choose a user
            </option>
            {users.map((user: User) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {userError && <span className="error">{userError}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={addedTodos} />
    </div>
  );
};
