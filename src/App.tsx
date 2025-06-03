import React, { useState } from 'react';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import './App.scss';
import { TodoList } from './components/TodoList';

const enrichedTodos = todosFromServer
  .map(todo => {
    const userFound = usersFromServer.find(user => user.id === todo.userId);

    if (!userFound) {
      return null;
    }

    return { ...todo, userFound };
  })
  .filter((todo): todo is NonNullable<typeof todo> => todo !== null);

export const App = () => {
  const [todos, setTodos] = useState(enrichedTodos);
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');

  const cleanTitle = (value: string) => {
    return value.replace(/[^a-zA-Z0-9\s\u0400-\u04FF]/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(cleanTitle(e.target.value));
    if (titleError) {
      setTitleError('');
    }
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(e.target.value);
    if (userError) {
      setUserError('');
    }
  };

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;

    if (!title.trim()) {
      setTitleError('Please enter a title');
      hasError = true;
    }

    if (!selectedUserId) {
      setUserError('Please choose a user');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const newId = todos.length ? Math.max(...todos.map(t => t.id)) + 1 : 1;
    const user = usersFromServer.find(u => u.id === +selectedUserId);

    if (!user) {
      setUserError('Please choose a valid user');

      return;
    }

    const newTodo = {
      id: newId,
      title: title.trim(),
      userId: user.id,
      completed: false,
      user,
    };

    setTodos(prev => [...prev, newTodo]);
    setTitle('');
    setSelectedUserId('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleAddTodo} noValidate>
        <div className="field">
          <label htmlFor="titleInput">Title</label>
          <input
            type="text"
            id="titleInput"
            data-cy="titleInput"
            placeholder="Enter todo title"
            value={title}
            onChange={handleTitleChange}
          />
          {titleError && <span className="error">{titleError}</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User</label>
          <select
            id="userSelect"
            data-cy="userSelect"
            value={selectedUserId}
            onChange={handleUserChange}
          >
            <option value="">Choose a user</option>
            {usersFromServer.map(user => (
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

      <TodoList todos={todos} />
    </div>
  );
};
