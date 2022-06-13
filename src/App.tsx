/* eslint-disable no-console */
import React, { useState } from 'react';

// import classnames from classnames;

import './App.scss';

import { TodoList } from './Components/todoList';
import { Todo, User, PreparedTodo } from './react-app-env';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const makePreparedTodos = (todos: Todo[], users: User[]): PreparedTodo[] => {
  return todos.map(todo => ({
    ...todo,
    user: users.find(user => todo.userId === user.id) || null,
  }));
};

const preparedTodos = makePreparedTodos(todosFromServer, usersFromServer);

const App: React.FC = () => {
  const [visiblTodos, setVisiblTodos] = useState<PreparedTodo[]>(preparedTodos);
  const [userName, setUserName] = useState(0);
  const [newTodo, setNewTodo] = useState('');
  const [errorUser, setErrorUser] = useState(false);
  const [errorNewToDo, setErrorNewToDo] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newUserTodo: PreparedTodo = {
      userId: userName,
      id: visiblTodos.length + 1,
      title: newTodo,
      completed: false,
      user: usersFromServer.find(user => user.id === userName) || null,
    };

    setErrorNewToDo(!newTodo);
    setErrorUser(!userName);

    if (userName && newTodo) {
      setVisiblTodos((currntVisiblTodos) => {
        return [...currntVisiblTodos, newUserTodo];
      });
      setUserName(0);
      setNewTodo('');
    }
  };

  return (
    <div className="app">
      <h1 className="title">Add todo form</h1>

      <form
        onSubmit={handleSubmit}
        className="app__form "
      >
        {/* сокращeнная запись для вызoва функции handleSubmit, event передается автоматически */}

        <input
          className="input is-primary"
          placeholder="Please enter the title"
          type="text"
          value={newTodo}
          onChange={(event) => {
            setNewTodo(event.target.value);
            setErrorNewToDo(false);
          }}
        />
        {errorNewToDo && (
          <span className="app__error">
            Please enter the title
          </span>
        )}

        <div className="select is-primary">
          <select
            name="userName"
            value={userName}
            onChange={(event) => {
              setUserName(+event.target.value);
              setErrorUser(false);
            }}
          >
            <option
              value="0"
              disabled
            >
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
        </div>

        {errorUser && (
          <span className="app__error">
            Please choose a user
          </span>
        )}

        <button
          className="button is-primary is-light"
          type="submit"
        >
          Add
        </button>
      </form>

      <TodoList preparedTodo={visiblTodos} />
    </div>
  );
};

export default App;
