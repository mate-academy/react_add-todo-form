import React, { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { User } from './types/User';
import { Todo } from './types/ToDo';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  // if there is no user with a given userId
  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [wrongTitleUser, setWrongTitleUser] = useState(false);
  const [todosToShow, setTodosToShow] = useState(todos);

  function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    const newTodoId = Math.max(...todosToShow.map(todo => todo.id)) + 1;

    if (title.trim() === '' || userId === 0) {
      setWrongTitleUser(true);
    } else {
      const todoToAdd = {
        id: newTodoId,
        title,
        completed: false,
        userId,
        user: getUser(userId),
      };

      setTodosToShow(currentTodos => ([
        ...currentTodos,
        todoToAdd,
      ]));

      setTitle('');
      setUserId(0);
      setWrongTitleUser(false);
    }
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="title">
            Enter a title:
          </label>
          <input
            type="text"
            id="title"
            data-cy="titleInput"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Enter a title"
          />
          {!title && wrongTitleUser
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user_choose">
            Choose user
          </label>
          <select
            id="user_choose"
            data-cy="userSelect"
            value={userId}
            onChange={(event) => setUserId(Number(event.target.value))}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {!userId && wrongTitleUser
            && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todosToShow} />
    </div>
  );
};
