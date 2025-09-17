import './App.scss';
import React, { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types';

export const App = () => {
  const initialTodos = todosFromServer
    .map(todo => {
      const user = usersFromServer.find(userr => userr.id === todo.userId);

      return user ? { ...todo, user } : null;
    })
    .filter(Boolean) as Todo[];

  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('0');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setTitle(value.replace(/[^a-zA-Z0-9а-яА-ЯїЇіІєЄґҐ ]/g, ''));

    if (value.trim()) {
      setTitleError('');
    }
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(event.target.value);
    if (event.target.value !== '0') {
      setUserError('');
    }
  };

  const validateForm = () => {
    let isValid = true;

    if (!title.trim()) {
      setTitleError('Please enter a title');
      isValid = false;
    }

    if (userId === '0') {
      setUserError('Please choose a user');
      isValid = false;
    }

    return isValid;
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validateForm()) {
      const selectedUser = usersFromServer.find(
        user => user.id.toString() === userId,
      );

      // Гарантуємо, що user знайдений
      if (!selectedUser) {
        setUserError('Selected user not found');

        return;
      }

      const newTodoId =
        todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;

      // Створюємо новий todo з обов'язковим user об'єктом
      const newTodo: Todo = {
        id: newTodoId,
        title: title.trim(),
        completed: false,
        userId: Number(userId),
        user: selectedUser, // Обов'язково додаємо user
      };

      setTodos(prevTodos => [...prevTodos, newTodo]);
      setTitle('');
      setUserId('0');
    }
  };

  // Перевіряємо, чи всі todos мають user
  const allTodosHaveUsers = todos.every(todo => todo.user);

  if (!allTodosHaveUsers) {
    return <div>Loading todos...</div>;
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        data-cy="addTodoForm"
        onSubmit={handleFormSubmit}
      >
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter a title"
          />
          {titleError && <span className="error">{titleError}</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>

          <select
            data-cy="userSelect"
            value={userId || 0}
            onChange={handleUserChange}
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
