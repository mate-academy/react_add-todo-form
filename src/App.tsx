import './App.scss';

import React, { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList/TodoList';

import { User } from './types/User';
import { Todo } from './types/Todo';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [inputTitle, setInputTitle] = useState('');
  const [inputUser, setInputUser] = useState('');
  const [visibleTodos, setVisibleTodos] = useState(todos);
  const [hasTitle, setHasTitle] = useState(true);
  const [hasUser, setHasUser] = useState(true);
  const addTodo = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newUser = usersFromServer.find(
      user => user.name === inputUser,
    ) || null;

    const newTodo: Todo = {
      id: (visibleTodos.reduce(
        (acc, curr) => (acc.id > curr.id ? acc : curr),
      )).id + 1,
      userId: newUser?.id || null,
      title: inputTitle,
      completed: false,
      user: newUser,
    };

    setHasTitle(!!inputTitle);
    setHasUser(!!inputUser);

    if (!!inputTitle && !!inputUser) {
      setVisibleTodos(current => [
        ...current,
        newTodo,
      ]);
      setInputTitle('');
      setInputUser('');
    }
  };

  const trimTitle = (title: string) => (
    title[0] === ' ' ? title.trim() : title
  );

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={addTodo}
      >
        <div className="field">
          <label>
            Title:&nbsp;
            <input
              type="text"
              data-cy="titleInput"
              className="input"
              placeholder="Enter a title"
              value={inputTitle}
              onChange={(event) => {
                setInputTitle(trimTitle(event.target.value));
              }}
            />
          </label>
          {(!hasTitle && !inputTitle) && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            User:&nbsp;
            <select
              data-cy="userSelect"
              value={inputUser}
              onChange={(event) => {
                setInputUser(event.target.value);
              }}
            >
              <option value="" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option
                  value={user.name}
                  key={user.username}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {(!hasUser && !inputUser) && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={visibleTodos} />
      </section>
    </div>
  );
};
