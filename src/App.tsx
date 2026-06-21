import React, { useState } from 'react';
import './App.scss';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import { TodoInfo } from './components/TodoInfo';
import { UserInfo } from './components/UserInfo';

const initialTodos = todosFromServer.map(todo => ({
  ...todo,
  user:
    usersFromServer.find(user => user.id === todo.userId) || usersFromServer[0],
}));

export const App = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('0');

  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const sanitizedValue = value.replace(/[^a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ0-9 ]/g, '');

    setTitle(sanitizedValue);
    setTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(event.target.value);
    setUserError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isTitleEmpty = title.trim() === '';
    const isUserNotSelected = userId === '0';

    if (isTitleEmpty || isUserNotSelected) {
      if (isTitleEmpty) {
        setTitleError(true);
      }

      if (isUserNotSelected) {
        setUserError(true);
      }

      return;
    }

    const selectedUser = usersFromServer.find(
      user => user.id === Number(userId),
    );

    if (!selectedUser) {
      return;
    }

    const maxId =
      todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) : 0;

    const newTodo = {
      id: maxId + 1,
      title: title.trim(),
      userId: Number(userId),
      completed: false,
      user: selectedUser,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);

    setTitle('');
    setUserId('0');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title-input">Title</label>
          <input
            id="title-input"
            type="text"
            data-cy="titleInput"
            placeholder="Enter todo title"
            value={title}
            onChange={handleTitleChange}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user-select">Choose a user</label>
          <select
            id="user-select"
            data-cy="userSelect"
            value={userId}
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

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList
        todos={todos}
        renderTodo={todoItem => (
          <TodoInfo key={todoItem.id} todo={todoItem}>
            <UserInfo user={todoItem.user} />
          </TodoInfo>
        )}
      />
    </div>
  );
};
