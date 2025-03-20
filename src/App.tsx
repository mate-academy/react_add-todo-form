import './App.scss';
import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

export const App = () => {
  const [todos, setTodos] = useState(
    todosFromServer.map(todo => ({
      ...todo,
      user: usersFromServer.find(user => user.id === todo.userId) || null,
    })),
  );
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [changeTitleInputError, setChangeTitleInputError] = useState(false);
  const [changeUserInputError, setChangeUserInputError] = useState(false);

  const handleTitleChange = (
    titleInputChangeEvent: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setChangeTitleInputError(false);
    setTitle(titleInputChangeEvent.target.value);
  };

  const handleUserChange = (
    userSelectChangeEvent: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    setChangeUserInputError(false);
    setUserId(+userSelectChangeEvent.target.value);
  };

  const handleSubmit = (
    formSubmitEvent: React.FormEvent<HTMLFormElement>,
  ): void => {
    formSubmitEvent.preventDefault();

    setChangeTitleInputError(!title);
    setChangeUserInputError(!userId);

    if (!title || !userId) {
      return;
    }

    const selectedUser =
      usersFromServer.find(user => user.id === userId) || null;

    const newTodo: Todo = {
      id: Math.max(...todos.map(todo => todo.id), 0) + 1,
      title: title.trim().replace(/[^A-Za-z0-9\u0400-\u04FF\s]+/gi, ''),
      completed: false,
      userId,
      user: selectedUser,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="todoTitle">
            Title:&nbsp;
            <input
              id="todoTitle"
              type="text"
              data-cy="titleInput"
              value={title}
              placeholder="Enter title"
              onChange={handleTitleChange}
            />
          </label>
          {changeTitleInputError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="todoUser">
            User:&nbsp;
            <select
              id="todoUser"
              data-cy="userSelect"
              value={userId}
              onChange={handleUserChange}
            >
              <option value="0" disabled>
                Choose a user
              </option>

              {usersFromServer.map(userFromServer => (
                <option value={userFromServer.id} key={userFromServer.id}>
                  {userFromServer.name}
                </option>
              ))}
            </select>
          </label>

          {changeUserInputError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
