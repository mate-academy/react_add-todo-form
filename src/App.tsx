import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList/TodoList';

import './App.scss';

function getUserId(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

function getUserName(userName: string): User | null {
  const foundUser = usersFromServer.find(user => user.name === userName);

  return foundUser || null;
}

const preparesTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserId(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(preparesTodos);
  const [todoTitle, setTodoTitle] = useState('');
  const [userName, setUserName] = useState('');
  const [hasTitleError, setTitleError] = useState(false);
  const [hasUserError, setUserError] = useState(false);

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();

    const newTodo: Todo = {
      id: Math.random(),
      title: todoTitle,
      user: getUserName(userName),
      completed: false,
    };

    setTitleError(!todoTitle);
    setUserError(!userName);

    if (!todoTitle || !userName) {
      return;
    }

    setTodos(currentTodos => [newTodo, ...currentTodos]);
    setUserName('');
    setTodoTitle('');
  }

  return (
    <div className="App">
      <h2 className="App__title">Todo</h2>
      <form
        action="/api/todos"
        method="POST"
        onSubmit={onSubmit}
        className="App__form"
      >
        <div className="App__form__field">
          <input
            className="App__form__field--input App__form-element"
            type="text"
            value={todoTitle}
            placeholder="Todo"
            onChange={event => {
              setTitleError(false);
              setTodoTitle(event.target.value);
            }}
          />

          {hasTitleError && (
            <span className="error"> Please enter the todo</span>
          )}
        </div>

        <div className="App__form__field">
          <select
            className="App__form__field--select App__form-element"
            value={userName}
            onChange={event => {
              setUserError(false);
              setUserName(event.target.value);
            }}
          >
            <option value="" disabled>Choose an User</option>

            {usersFromServer.map(user => (
              <option
                value={user.name}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {hasUserError && (
            <span className="error"> Please select an User</span>
          )}
        </div>

        <button
          className="App__button App__form-element"
          type="submit"
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
