import './App.scss';

import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './components/types/User';
import { Todo } from './components/types/Todo';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const defaultTodos: Todo[] = todosFromServer.map(todo => (
  {
    ...todo,
    user: getUser(todo.userId),
  }
));

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [todos, setTodos] = useState(defaultTodos);
  const [completed] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const createTodo = () => {
    return {
      id: Math.max(0, ...todos.map(({ id }) => id + 1)),
      title,
      completed,
      userId,
      user: getUser(userId) || null,
    };
  };

  const handleClick = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.length) {
      setTitleError(true);
    }

    if (!userId) {
      setUserError(true);
    }

    if (titleError || userError) {
      return;
    }

    if (title.length > 0 && userId > 0) {
      setTitle('');
      setUserId(0);
      setTodos([...todos, createTodo()]);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleClick}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              setTitleError(false);
            }}
          />
          {titleError && (<span className="error">Please enter a title</span>)}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={(event) => {
              setUserError(false);
              setUserId(Number(event.target.value));
            }}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(el => (
              <option value={el.id}>{el.name}</option>))}
          </select>

          {userError && (<span className="error">Please choose a user</span>)}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={todos} />
      </section>
    </div>
  );
};
