import './App.scss';
import React, { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { User } from './components/types/user';
import { Todo } from './components/types/todo';

function getUserId(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

function getTodoId(listTodos: Todo[]): number {
  const todosId = listTodos.map(todo => todo.id);

  return Math.max(...todosId) + 1;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserId(todo.userId),
}));

function titleValidation(value: string) {
  return value.replace(/[^а-яА-ЯёЁ\w\d\s$]/g, '');
}

export const App: React.FC = () => {
  const [listTodos, setListTodos] = useState(todos);
  const [title, setTitle] = useState('');
  const [user, setUser] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleError(false);
    setTitle(titleValidation(event.target.value));
  };

  const handleChangeUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserError(false);
    setUser(Number(event.target.value));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      setTitleError(true);
    }

    if (!user) {
      setUserError(true);
    }

    if (title && user) {
      const newTodo: Todo = {
        id: getTodoId(listTodos),
        title,
        userId: user,
        completed: false,
        user: getUserId(user),
      };

      setListTodos(prevlist => [...prevlist, newTodo]);
      setTitle('');
      setUser(0);
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
          <label htmlFor="textId">
            Title:
          </label>
          <input
            type="text"
            id="textId"
            data-cy="titleInput"
            name="Enter a title"
            placeholder="Enter a title"
            value={title}
            onChange={handleChangeTitle}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="usertId">
            User:
          </label>
          <select
            data-cy="userSelect"
            id="usertId"
            name="user"
            value={user}
            onChange={handleChangeUser}
          >
            <option
              value="0"
              disabled
            >
              Choose a user
            </option>
            {usersFromServer.map(userFromServer => (
              <option
                key={userFromServer.id}
                value={userFromServer.id}
              >
                {userFromServer.name}
              </option>
            ))}
          </select>
          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={listTodos} />
    </div>
  );
};
