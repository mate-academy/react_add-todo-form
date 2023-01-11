import React, { FormEvent, useState } from 'react';
import './App.scss';
import cn from 'classnames';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { User } from './types/User';

function getUserById(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const preparedTodo: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const getNewId = (array: { id: number }[]) => (
  Math.max(...array.map(el => el.id)) + 1
);

export const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [todos, setTodos] = useState(preparedTodo);
  const [title, setTitle] = useState('');

  const [selectedUserIdError, setSelectedUserIdError] = useState('');
  const [titleError, setTitleError] = useState('');

  const reset = () => {
    setSelectedUserId(0);
    setTitle('');
  };

  const hadleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedUserId || !title) {
      setSelectedUserIdError(!selectedUserId ? 'Please choose a user' : '');
      setTitleError(!title ? 'Please enter a title' : '');

      return;
    }

    const newTodo:Todo = {
      id: getNewId(todos),
      userId: selectedUserId,
      title,
      completed: false,
      user: getUserById(selectedUserId),
    };

    setTodos(
      [...todos, newTodo],
    );

    reset();
  };

  const handleChangeNewSelectedUserId = (value: string) => {
    setSelectedUserId(+value);
    setSelectedUserIdError('');
  };

  const handleChangeNewTitle = (value: string) => {
    setTitle(value);
    setTitleError('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={hadleSubmit}
      >
        <div className="field">
          <label>
            {' '}
            Title:
            {' '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={
                (event) => handleChangeNewTitle(event.target.value)
              }
            />
          </label>
          <span className={cn('error', { errorVisible: Boolean(titleError) })}>
            Please enter a title
          </span>
        </div>

        <div className="field">
          <label>
            {' '}
            User:
            {' '}
            <select
              data-cy="userSelect"
              value={selectedUserId}
              onChange={
                (event) => handleChangeNewSelectedUserId(event.target.value)
              }
            >
              <option value={0} disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
          </label>

          <span
            className={cn('error', {
              errorVisible: Boolean(selectedUserIdError),
            })}
          >
            Please choose a user
          </span>
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
