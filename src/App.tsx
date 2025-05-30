import React, { useState, useEffect } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';

export const App = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const todosWithUsers = todosFromServer.map(todo => ({
      ...todo,
      user: usersFromServer.find(user => user.id === todo.userId),
    }));

    setTodos(todosWithUsers);
  }, []);

  const filterTitle = value => value.replace(/[^a-zA-Zа-яА-ЯёЁ0-9 ]/g, '');

  const handleTitleChange = e => {
    const filteredValue = filterTitle(e.target.value);

    setTitle(filteredValue);
    if (formSubmitted) {
      setTitleError(filteredValue.trim() ? '' : 'Please enter a title');
    }
  };

  const handleUserChange = e => {
    setUserId(e.target.value);
    if (formSubmitted) {
      setUserError(e.target.value ? '' : 'Please choose a user');
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    setFormSubmitted(true);

    let valid = true;

    if (!title.trim()) {
      setTitleError('Please enter a title');
      valid = false;
    } else {
      setTitleError('');
    }

    if (!userId) {
      setUserError('Please choose a user');
      valid = false;
    } else {
      setUserError('');
    }

    if (!valid) {
      return;
    }

    const maxId = todos.length ? Math.max(...todos.map(t => t.id)) : 0;
    const selectedUser = usersFromServer.find(u => u.id === Number(userId));

    const newTodo = {
      id: maxId + 1,
      title: title.trim(),
      userId: Number(userId),
      completed: false,
      user: selectedUser,
    };

    setTodos(prev => [...prev, newTodo]);

    setTitle('');
    setUserId('');
    setFormSubmitted(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter todo title"
          />
          {titleError && <span className="error">{titleError}</span>}
        </div>

        <div className="field">
          <select
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
