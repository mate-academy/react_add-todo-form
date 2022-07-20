import React, { useState } from 'react';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types/Todo';

import './App.scss';

import todosFromServer from './api/todos';
import users from './api/users';

const preparedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId) || null,
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState(preparedTodos);
  const [title, setTitle] = useState('');
  const [userName, setUserName] = useState('');
  const [isTitle, setIsTitle] = useState(true);
  const [isUserName, setIsUserName] = useState(true);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitle(true);
  };

  const handelUserName = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserName(event.target.value);
    setIsUserName(true);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      setIsTitle(false);
    }

    if (!userName) {
      setIsUserName(false);
    }

    if (title && userName) {
      const newUser = users.find(user => user.name === userName) || null;

      const newTodo = {
        id: todos[todos.length - 1].id + 1,
        title: title.trim(),
        completed: false,
        userName: newUser?.id,
        user: newUser,
      };

      setTodos([...todos, newTodo]);
      setTitle('');
      setUserName('');
    }
  };

  return (
    <div className="App">
      <div className="App__container box">
        <h1 className="App__title">
          Add todo form
        </h1>

        <form
          className="form"
          action="/api/users"
          method="POST"
          onSubmit={handleSubmit}
        >
          <div className="field field-title">
            <input
              className="input is-rounded"
              type="text"
              data-cy="titleInput"
              placeholder="Title"
              value={title}
              onChange={handleTitle}
            />

            {!isTitle && (
              <span className="error">
                Please enter a title
              </span>
            )}
          </div>

          <div
            className="
              field
              select
              is-rounded
            "
          >
            <select
              className=""
              name="users"
              data-cy="userSelect"
              value={userName}
              onChange={handelUserName}
            >
              <option value="0">
                Choose a user
              </option>

              {users.map(user => (
                <option key={user.id} value={user.name}>
                  {user.name}
                </option>
              ))}
            </select>

            {!isUserName && (
              <span className="error">
                Please, choose a user
              </span>
            )}
          </div>

          <button
            className="button"
            type="submit"
            data-cy="submitButton"
          >
            Add
          </button>
        </form>

        <TodoList todos={todos} />
      </div>
    </div>
  );
};
