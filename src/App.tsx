import './App.scss';
import React, { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoWithUser, User } from './App.types';
import { TodoList } from './components/TodoList';

const todosWithUser: TodoWithUser[] = todosFromServer.map(
  (todo): TodoWithUser => {
    const user = usersFromServer.find(({ id }) => id === todo.userId) as User;

    return {
      ...todo,
      user,
    };
  },
);
const defaultOptionIndex = '0';

export const App = () => {
  const [todos, setTodos] = useState<TodoWithUser[]>([...todosWithUser]);
  const [title, setTitle] = useState('');
  const [userName, setUserName] = useState(defaultOptionIndex);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const clearForm = () => {
    setTitle('');
    setUserName(defaultOptionIndex);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title) {
      setHasTitleError(true);
    }

    if (userName === defaultOptionIndex) {
      setHasUserError(true);
    }

    if (title && userName !== defaultOptionIndex) {
      const newTodo: TodoWithUser = {
        userId: usersFromServer.find(user => user.name === userName)
          ?.id as number,
        id: Math.max(...todos.map(todo => todo.id)) + 1,
        title,
        completed: false,
        user: usersFromServer.find(
          user => user.id === Number(userName),
        ) as User,
      };

      setTodos([...todos, newTodo]);
      clearForm();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={event => {
          handleSubmit(event);
        }}
      >
        <div className="field">
          <input
            type="text"
            value={title}
            data-cy="titleInput"
            placeholder="Please enter a title"
            onChange={event => {
              setTitle(event.target.value);
              setHasTitleError(false);
            }}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userName}
            onChange={event => {
              setUserName(event.target.value);
              setHasUserError(false);
            }}
          >
            <option value={defaultOptionIndex} disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => {
              return (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>

          {hasUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
