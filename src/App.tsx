import React, { useState } from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { Todo } from './components/TodoInfo/TodoInfo';
import { TodoList } from './components/TodoList/TodoList';

const preparedTodos: Todo[] = todos.map(todo => ({
  ...todo,
  user: users.find(user => (user.id === todo.userId) || null),
}));

function getMaxId(currentTodos: Todo[]) {
  const id = currentTodos.map(todo => todo.id);

  return Math.max.apply(null, id);
}

const App: React.FC = () => {
  const [actualTodos, setTodos] = useState(preparedTodos);
  const [userName, setUserName] = useState('');
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserNameError, setHasUserNameError] = useState(false);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserNameError(!userName);

    if (!title || !userName) {
      return;
    }

    const newUser = users.find(user => user.name === userName);

    const todoToAdd: Todo = {
      userId: newUser?.id || 0,
      id: getMaxId(actualTodos),
      title,
      user: newUser || null,
    };

    setTodos(currentTodos => [...currentTodos, todoToAdd]);
    setTitle('');
    setUserName('');
  }

  return (
    <div className="App">
      <div className="form">
        <h1>Add todo form</h1>

        <form
          onSubmit={onSubmit}
        >
          <div className="select">
            <select
              name="userName"
              value={userName}
              onChange={(event) => {
                setHasUserNameError(false);
                setUserName(event.target.value);
              }}
            >
              <option value="" disabled>
                Select user
              </option>

              {users.map(user => (
                <option
                  value={user.name}
                  key={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
            <br />
            {hasUserNameError
              && (
                <span
                  className="dataError"
                >
                  Plesase, select a user
                </span>
              )}
          </div>

          <div className="input">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={title}
              onChange={(event) => {
                setHasTitleError(false);
                setTitle(event.target.value);
              }}
            />
            <br />
            {hasTitleError
              && (
                <span className="dataError">
                  Please, enter a title
                </span>
              )}
          </div>

          <button type="submit">
            Add
          </button>
        </form>
      </div>

      <div className="todoList">
        <TodoList todos={actualTodos} />
      </div>
    </div>
  );
};

export default App;
