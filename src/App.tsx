import React, { useState } from 'react';
import './App.scss';

import { TodoList } from './components/TodoList/TodoList';
import { PreparedTodo } from './components/types/preparedTodo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const preparedTodos: PreparedTodo[] = todosFromServer.map(todo => {
  return {
    ...todo,
    user: usersFromServer.find(user => user.id === todo.userId),
  };
});

let maxTodoId = [...todosFromServer].sort((el1, el2) => (
  el2.id - el1.id))[0].id;

const addTodo = (title: string, userName: string) => {
  maxTodoId += 1;

  const newTodo = {
    id: maxTodoId,
    title,
    completed: false,
    userId: 1,
    user: usersFromServer.find(user => user.name === userName),
  };

  preparedTodos.push(newTodo);
};

export const App = () => {
  const [title, setTitle] = useState('');
  const [user, setUser] = useState('');
  const [errorUser, setErrorUser] = useState(false);
  const [errorTitle, setErrorTitle] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    if (name === 'title') {
      setTitle(value);
    } else {
      setUser(value);
    }
  };

  const submit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if (!title || !user) {
      if (!title) {
        setErrorTitle(true);
      }

      if (!user) {
        setErrorUser(true);
      }

      return;
    }

    addTodo(title, user);
    setTitle('');
    setUser('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        onSubmit={submit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            name="title"
            value={title}
            placeholder="Enter the title"
            onChange={handleChange}
          />
          {errorTitle && (
            <span className="error">
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <select
            name="user"
            data-cy="userSelect"
            onChange={handleChange}
            value={user}
          >
            <option
              value=""
            >
              Choose a user
            </option>
            {usersFromServer.map(item => (
              <option
                value={item.name}
                key={item.id}
              >
                {item.name}
              </option>
            ))}
          </select>
          {errorUser && (
            <span className="error">
              Please choose a user
            </span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          className="button"
        >
          Add
        </button>
      </form>

      <TodoList prepared={preparedTodos} />
    </div>
  );
};
