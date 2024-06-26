import './App.scss';

import React, { useState } from 'react';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/types';
import { Todo } from './types/types';
import { ServerTodo } from './types/types';

function findUser(userId: number): User {
  return usersFromServer.find((userFromServer: User): boolean => {
    return userFromServer.id === userId;
  })!;
}

const preparedTodos: Todo[] = todosFromServer.map(
  (todoFromServer: ServerTodo): Todo => {
    const user: User = findUser(todoFromServer.userId);

    return {
      user: user,
      ...todoFromServer,
    };
  },
);

export const App = () => {
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState(0);
  const [todos, setTodos] = useState(preparedTodos);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  if (hasTitleError && title.trim()) {
    setHasTitleError(false);
  }

  if (hasUserError && findUser(selectedUser)) {
    setHasUserError(false);
  }

  const submitForm = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    let error = false;

    if (!findUser(selectedUser)) {
      setHasUserError(true);
      error = true;
    } else {
      setHasUserError(false);
    }

    if (!title.trim()) {
      setHasTitleError(true);
      error = true;
    } else {
      setHasTitleError(false);
    }

    if (error) {
      return;
    }

    const ids: number[] = [...todos].map((todo: Todo) => todo.id);
    const nextId: number = Math.max(...ids) + 1;

    const todo = {
      id: nextId,
      userId: selectedUser,
      title: title,
      completed: false,
      user: findUser(selectedUser),
    };

    setTodos([...todos, todo]);
    setSelectedUser(0);
    setTitle('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form action="/api/todos" method="POST" onSubmit={submitForm}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder="What to do?"
            onChange={event => setTitle(event.target.value)}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUser}
            onChange={event => setSelectedUser(+event.target.value)}
          >
            <option value="0" defaultChecked disabled>
              Choose a user
            </option>
            {usersFromServer.map((user: User) => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
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
