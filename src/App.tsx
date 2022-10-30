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

const getNewId = (list: Todo[]) => {
  return Math.max(...list.map((todo) => todo.id)) + 1;
};

export const App: React.FC = () => {
  const [list, setList] = useState(todos);
  const [title, setTitle] = useState('');
  const [user, setUser] = useState('');
  const [titleIsCorrect, setTitleIsCorrect] = useState(true);
  const [userIsCorrect, setUserIsCorrect] = useState(true);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (!title.trim()) {
      setTitleIsCorrect(false);
    }

    if (!user) {
      setUserIsCorrect(false);
    }

    if (title.trim() && user) {
      setList(
        [...list, {
          id: getNewId(list),
          userId: +user,
          title,
          completed: false,
          user: getUser(+user),
        }],
      );

      setTitle('');
      setUser('');
    }
  };

  const titleHandler = (value: React.SetStateAction<string>) => {
    setTitle(value);
    setTitleIsCorrect(true);
  };

  const userHandler = (value: React.SetStateAction<string>) => {
    setUser(value);
    setUserIsCorrect(true);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={submitHandler}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={(event) => titleHandler(event.target.value)}
          />
          {!titleIsCorrect && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={user}
            onChange={(event) => userHandler(event.target.value)}
          >
            <option value="" disabled>Choose a user</option>
            {usersFromServer.map(userFromServer => {
              return (
                <option value={userFromServer.id} key={userFromServer.id}>
                  {userFromServer.name}
                </option>
              );
            })}
          </select>
          {!userIsCorrect && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={list} />
    </div>
  );
};
