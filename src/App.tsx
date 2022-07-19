import './App.scss';

import React, { useState } from 'react';
import usersFromServer from './api/users';

import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';

const preparedTodos = todosFromServer.map(todo => {
  const userList = usersFromServer.find(user => user.id === todo.userId);

  return ({
    ...todo,
    user: userList,
  });
});

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(preparedTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [isError, setIsError] = useState(false);

  function resetFields() {
    setTitle('');
    setUserId(0);

    setIsError(false);
  }

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!title || !userId) {
      setIsError(true);

      return;
    }

    const arrId = todosFromServer.map(todo => todo.id);
    const maxId = Math.max(...arrId);
    const userTodo = usersFromServer.find(user => user.id === userId);

    const newTodo: Todo = {
      id: maxId + 1,
      title,
      userId,
      completed: false,
      user: userTodo,
    };

    setTodos(currentTodo => [...currentTodo, newTodo]);
    resetFields();
  }

  return (
    <div className="App">
      <h1 className="title">Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={onSubmit}
        className="box"
      >
        <div className="field">
          <div className="control">
            <input
              type="text"
              value={title}
              data-cy="titleInput"
              className="input"
              placeholder="Text input"
              onChange={(event) => setTitle(event.target.value)}
            />
            {!title && isError && (
              <span className="error">Please enter a title</span>
            )}
          </div>
        </div>

        <div className="field">
          <div className="control">
            <div className="select">
              <select
                data-cy="userSelect"
                onChange={(event) => setUserId(+event.target.value)}
                value={userId}
              >
                <option value={0} disabled>
                  Choose a user
                </option>
                {usersFromServer.map(user => (
                  <option
                    value={user.id}
                    key={user.email}
                  >
                    {user.name}
                  </option>
                ))}
              </select>

              {!userId && isError && (
                <span className="error">Please choose a user</span>
              )}
            </div>
          </div>
        </div>

        <div className="control">
          <button
            className="button is-primary"
            type="submit"
            data-cy="submitButton"
          >
            Add
          </button>
        </div>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
