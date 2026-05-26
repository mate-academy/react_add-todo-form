import './App.scss';
import { TodoList } from './components/TodoList';
import React from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { PreparedTodo } from './types/PreparedTodo';

export const App = () => {
  const preparedTodos = todosFromServer.map(todo => ({
    ...todo,
    user: usersFromServer.find(user => user.id === todo.userId),
  }));

  const [todos, setTodos] = React.useState<PreparedTodo[]>(preparedTodos);
  const [title, setTitle] = React.useState('');
  const [userId, setUserId] = React.useState(0);
  const [titleError, setTitleError] = React.useState(false);
  const [userError, setUserError] = React.useState(false);

  function handleChangeTitle(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    const filteredValue = value.replace(/[^a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ0-9 ]/g, '');

    setTitle(filteredValue);
    setTitleError(false);
  }

  function handleChangeUser(event: React.ChangeEvent<HTMLSelectElement>) {
    setUserId(Number(event.target.value));
    setUserError(false);
  }

  function validateForm() {
    if (!title) {
      setTitleError(true);
    }

    if (userId === 0) {
      setUserError(true);
    }
  }

  function resetForm() {
    setTitle('');
    setUserId(0);
    setTitleError(false);
    setUserError(false);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    validateForm();

    if (!title || userId === 0) {
      return;
    }

    const maxId = Math.max(...todos.map(todo => todo.id));
    const user = usersFromServer.find(currUser => currUser.id === userId);

    const newTodo = {
      id: maxId + 1,
      title,
      userId,
      completed: false,
      user: user || null,
    };

    setTodos([...todos, newTodo]);
    resetForm();
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleChangeTitle}
            placeholder="Enter a title"
          />

          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleChangeUser}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
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
