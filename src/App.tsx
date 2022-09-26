import './App.scss';

import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';

import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

const todoId = todos.map(({ id }) => id);

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [currentTodos, setCurrentTodos] = useState([...todos]);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const addHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (title.trim() === '') {
      setTitleError(true);
    }

    if (userId === 0) {
      setUserError(true);
    }

    if (title.trim() === '' || userId === 0) {
      return;
    }

    const newTodo = {
      id: Math.max(...todoId) + 1,
      userId,
      title,
      completed: false,
      user: getUser(userId),
    };

    setCurrentTodos((prevTodos) => {
      return [...prevTodos, newTodo];
    });

    setTitle('');
    setUserId(0);
    setTitleError(false);
    setUserError(false);
  };

  const titleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const userHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={addHandler}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={titleHandler}
          />
          {titleError && <span className="error"> Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            data-cy="userSelect"
            id="user"
            value={userId}
            onChange={userHandler}
          >
            <option value="0" disabled selected>Choose a user</option>
            {usersFromServer.map(user => {
              return (
                <option
                  value={user.id}
                  key={user.id}
                >
                  {user.name}
                </option>
              );
            })}
          </select>

          {userError && <span className="error"> Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>
      <TodoList todos={currentTodos} />
    </div>
  );
};
