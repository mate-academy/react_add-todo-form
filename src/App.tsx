import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import React, { useState } from 'react';

import { Todo } from './types/Todos';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(
    todosFromServer.map(todo => ({
      ...todo,
      user: usersFromServer.find(user => user.id === todo.userId)!,
    })),
  );
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState<number | ''>('');
  const [titlError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');

  const handleAddTodo = (event: React.FormEvent) => {
    event.preventDefault();
    let hasError = false;

    if (!title.trim()) {
      setTitleError('Please enter a title');
      hasError = true;
    }

    if (!userId) {
      setUserError('Please choose a user');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const selectedUser = usersFromServer.find(user => user.id === userId);

    if (!selectedUser) {
      return;
    }

    const newId = todos.length
      ? Math.max(...todos.map(todo => todo.id)) + 1
      : 1;

    const newTodo: Todo = {
      id: newId,
      title: title.trim(),
      userId: selectedUser.id,
      completed: false,
      user: selectedUser,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setUserId('');
    setTitleError('');
    setUserError('');
  };

  const handleTitleEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filtered = event.target.value.replace(/[^a-zA-Zа-яА-Я0-9 ]/g, '');

    setTitle(filtered);
    if (titlError) {
      setTitleError('');
    }
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
    if (userError) {
      setUserError('');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleAddTodo} action="/api/todos" method="POST">
        <div className="field">
          <input
            placeholder="Enter todo list"
            value={title}
            onChange={handleTitleEvent}
            type="text"
            data-cy="titleInput"
          />
          {titlError && <span className="error">{titlError}</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User</label>
          <select
            id="user"
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
