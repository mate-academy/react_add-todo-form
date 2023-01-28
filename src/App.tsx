import './App.scss';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
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
  const [todosTitle, setTodoTitle] = useState('');
  const [todosUserId, setTodosUserId] = useState(-1);
  const [titleIsVerified, setIsTitleVerified] = useState(true);
  const [userIsVerified, setIsUserVerified] = useState(true);
  const maxIdInitial = Math.max(...todosFromServer.map(todo => todo.id));
  const [maxId, setMaxId] = useState(maxIdInitial + 1);

  const handlerSubmit = () => {
    if (todosTitle.length && todosUserId > -1) {
      setMaxId(maxId + 1);

      const todo: Todo = {
        id: maxId,
        userId: todosUserId,
        title: todosTitle,
        completed: false,
        user: getUser(todosUserId),
      };

      todos.push(todo);

      setTodoTitle('');
      setTodosUserId(-1);
    } else {
      if (!todosTitle.length) {
        setIsTitleVerified(false);
      }

      if (todosUserId === -1) {
        setIsUserVerified(false);
      }
    }
  };

  const handlerTitleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const regEx = /^[a-zA-Z0-9 ]*$/;

    if (regEx.test(inputValue)) {
      setTodoTitle(event.target.value);
      setIsTitleVerified(true);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => {
          event.preventDefault();
          handlerSubmit();
        }}
      >
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            id="titleInput"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a Title"
            value={todosTitle}
            onChange={event => {
              handlerTitleInput(event);
            }}
          />
          {!titleIsVerified
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            id="userSelect"
            data-cy="userSelect"
            value={todosUserId}
            onChange={event => {
              setTodosUserId(+event.target.value);
              setIsUserVerified(true);
            }}
          >
            <option value={-1} disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {!userIsVerified
            && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
