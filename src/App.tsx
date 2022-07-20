import React, { useState } from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { Todo } from './components/TodoInfo/TodoInfo';
import { TodoList } from './components/TodoList/TodoList';
import { User } from './components/UserInfo/UserInfo';

const preparedTodos: Todo[] = todos.map(todo => ({
  ...todo,
  user: users.find(user => (user.id === todo.userId) || null),
}));

function getMaxId(currentTodos: Todo[]) {
  const id = currentTodos.map(todo => todo.id);

  return Math.max.apply(null, id);
}

function getUserId(currentUsers: User[], userName: string) {
  const id = currentUsers
    .filter(currentUser => currentUser.name === userName)
    .map(currentUser => currentUser.id);

  return id[0];
}

const App: React.FC = () => {
  const [actualTodos, setTodos] = useState(preparedTodos);
  const [userName, setUserName] = useState('');
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserNameError, setHasUserNameError] = useState(false);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const todoToAdd: Todo = {
      userId: getUserId(users, userName),
      id: getMaxId(actualTodos),
      title,
      completed,
      user: users.find(user => user.name === userName) || null,
    };

    setHasTitleError(!title);
    setHasUserNameError(!userName);

    if (!title || !userName) {
      return;
    }

    setCompleted(!completed);
    setTodos(currentTodos => [...currentTodos, todoToAdd]);
    setTitle('');
    setUserName('');
  }

  return (
    <div className="App">
      <div className="form">
        <h1>Add todo form</h1>

        <form
          action="POST"
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
              <option
                value=""
                disabled
              >
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
                <span
                  className="dataError"
                >
                  Please, enter a title
                </span>
              )}
          </div>

          <button
            type="submit"
          >
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
