import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import { findUserById } from './services/user';
import { User } from './types/user';
import { Todo } from './types/todo';

export const App = () => {
  const [todos, setTodos] = useState([...todosFromServer]);
  const [title, setTitle] = useState('');
  const [userSelect, setUserSelect] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userSelectError, setUserSelectError] = useState(false);
  const visibleTodos = [...todos].map(todo => ({
    ...todo,
    user: findUserById(todo.userId),
  }));

  function reset() {
    setTitle('');
    setUserSelect(0);
    setTitleError(false);
    setUserSelectError(false);
  }

  function generateTodoId() {
    return Math.max(...todos.map(todo => todo.id)) + 1;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setTitleError(!title);
    setUserSelectError(!userSelect);

    if (!title || !userSelect) {
      return;
    }

    const newTodo: Todo = {
      id: generateTodoId(),
      title: title,
      userId: userSelect,
      completed: false,
      user: findUserById(userSelect),
    };

    setTodos(prev => [...prev, newTodo]);

    reset();
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
    setTitleError(false);
  }

  function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setUserSelect(+e.target.value);
    setUserSelectError(false);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title </label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Write new title here"
            value={title}
            onChange={handleInputChange}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="selectUser">User </label>
          <select
            id="selectUser"
            data-cy="userSelect"
            value={userSelect}
            onChange={handleSelectChange}
          >
            <option value="0">Choose a user</option>
            {usersFromServer.map((user: User) => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {userSelectError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
