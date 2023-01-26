import './App.scss';
import React, { useState } from 'react';
// import React from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { FullTodo, Todo } from './types/Todo';
import { User } from './types/User';
import { TodoList } from './components/TodoList';

const prepareTodos = (
  users: User[],
  todos: Todo[],
): FullTodo[] => {
  return todos.map((todo) => ({
    ...todo,
    user: users.find((user) => user.id === todo.userId) || null,
  }));
};

const todos = prepareTodos(usersFromServer, todosFromServer);
const users = usersFromServer;

export const App: React.FC = () => {
  const [userFromSelect, setUser] = useState('0');
  const [userError, setUserError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [title, setTitle] = useState('');
  const [todosArr, setTodo] = useState(todos);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserError(false);
    const { value } = event.target;

    setUser(value);
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleError(false);
    const { value } = event.target;

    setTitle(value);
  };

  const handleAddTodo = () => {
    const currentUser = users
      .find(user => user.name === userFromSelect) || null;

    if (!currentUser) {
      setUserError(true);
    }

    if (!title.length) {
      setTitleError(true);
    }

    if (currentUser && title) {
      const maxId = Math.max(...todos.map(todo => todo.id));
      const todo: FullTodo = {
        id: maxId + 1,
        title,
        completed: false,
        userId: currentUser.id,
        user: currentUser,
      };

      setTodo(current => ([
        ...current,
        todo,
      ]));

      setTitle('');
      setUser('0');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleChangeTitle}
            />
          </label>
          {titleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={userFromSelect}
              onChange={handleChangeSelect}
            >
              <option value="0" disabled>Choose a user</option>
              {users.map((user) => (
                <option
                  value={user.name}
                  key={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          {userError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={handleAddTodo}
        >
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={todosArr} />
      </section>
    </div>
  );
};
