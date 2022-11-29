import React, { useState } from 'react';
import './App.scss';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [isErrorForTitle, setIsErrorForTitle] = useState(false);
  const [isErrorForUser, setIsErrorForUser] = useState(false);

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsErrorForTitle(false);
  };

  const handleChangeUserId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setIsErrorForUser(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const todosId: number[] = todos.map((todo) => todo.id);
    const maxTodoId: number = Math.max(...todosId);

    if (title !== '' && userId !== 0) {
      const newTodo = {
        id: maxTodoId + 1,
        userId,
        title,
        completed: false,
        user: getUser(userId),
      };

      todos.push(newTodo);

      setTitle('');
      setUserId(0);
    }
  };

  const handleShowErrors = () => {
    if (title === '') {
      setIsErrorForTitle(true);
    }

    if (userId === 0) {
      setIsErrorForUser(true);
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
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Title"
            value={title}
            onChange={handleChangeTitle}
          />
          {isErrorForTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleChangeUserId}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {isErrorForUser && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={handleShowErrors}
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
