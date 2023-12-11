import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [titleNotFilled, setTitleNotFilled] = useState(false);
  const [userNotFilled, setUserNotFilled] = useState(false);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleNotFilled(!event.target.value.trim());
    setTitle(event.target.value);
  };

  const handleUserSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserNotFilled(false);
  };

  const resetForm = () => {
    setTitle('');
    setUserId(0);
  };

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    setTitleNotFilled(!trimmedTitle);
    setUserNotFilled(!userId);

    if (!trimmedTitle || !userId) {
      return;
    }

    const newId = Math.max(...todos.map(todo => todo.id)) + 1;

    const newTodo = {
      id: newId,
      title: trimmedTitle,
      completed: false,
      userId,
    };

    setTodos(oldTodos => [...oldTodos, newTodo]);

    resetForm();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleOnSubmit}>
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            id="title"
            placeholder="Enter a title"
            onChange={handleTitle}
            value={title}
          />
          {titleNotFilled
            && (<span className="error">Please enter a title</span>)}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            data-cy="userSelect"
            id="user"
            onChange={handleUserSelect}
            value={userId}
          >
            <option value="0" disabled selected>Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>

          {userNotFilled
            && (<span className="error">Please choose a user</span>)}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
