import React, { useState } from 'react';
import './App.scss';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [user, setUser] = useState(0);
  const [listTodo, setListTodo] = useState(todos);

  const [errorTitle, setErrorTitle] = useState(false);
  const [errorUser, setErrorUser] = useState(false);

  const newTodoAdd = () => {
    if (!title) {
      setErrorTitle(true);
    }

    if (!user) {
      setErrorUser(true);
    }

    if (!title || !user) {
      return;
    }

    function maxId(someTodolist: Todo[]) {
      return Math.max(...someTodolist.map(someTodo => someTodo.id));
    }

    const newTodo = {
      id: maxId(listTodo) + 1,
      title,
      completed: false,
      userId: user,
      user: usersFromServer.find(item => item.id === user) || null,
    };

    setListTodo((prev) => [...prev, newTodo]);
    setTitle('');
    setUser(0);
  };

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    newTodoAdd();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        onSubmit={onFormSubmit}
        action="/api/users"
        method="POST"
      >
        <div className="field">
          {'Title: '}
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              setErrorTitle(false);
            }}
          />

          {errorTitle && (
            <span className="error">
              Please enter a title
            </span>
          )}

        </div>

        <div className="field">
          {'User: '}
          <select
            data-cy="userSelect"
            value={user}
            onChange={(event) => {
              setUser(+event.target.value);
              setErrorUser(false);
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(someUser => (
              <option
                value={someUser.id}
                key={someUser.id}
              >
                {someUser.name}
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
        >
          Add
        </button>
      </form>

      <TodoList todos={listTodo} />
    </div>
  );
};
