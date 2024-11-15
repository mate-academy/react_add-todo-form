import { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoInfo } from './components/TodoInfo/TodoInfo';
import React from 'react';

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [todos, setTodos] = useState(todosFromServer);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(event.target.value);
    setHasUserError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) {
      setHasTitleError(true);
    }
    if (!userId) {
      setHasUserError(true);
    }
    if (!title || !userId) {
      return;
    }

    const newTodo = {
      id: Math.max(0, ...todos.map(todo => todo.id)) + 1,
      title,
      userId: Number(userId),
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setUserId('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="post-title">Title: </label>
          <input
            id="post-title"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter a title"
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user-id">User: </label>
          <select
            id="user-id"
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
          >
            <option value="">Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {hasUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        {todos.map(todo => {
          const user = usersFromServer.find(user => user.id === todo.userId);

          return (
            <TodoInfo
              key={todo.id}
              todo={todo}
              user={user}
            />
          );
        })}
      </section>
    </div>
  );
};
