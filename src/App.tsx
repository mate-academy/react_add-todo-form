import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId?: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [todo, setTodo] = useState(todos);
  const [title, setTitle] = useState('');
  const [userValue, setUserValue] = useState('');
  const [titleEmpty, setTitleEmpty] = useState(false);
  const [userEmpty, setUserEmpty] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const maxId = Math.max(...todo.map((t) => t.id), 0);

    setTitleEmpty(!title);
    setUserEmpty(!userValue);

    if (title && userValue) {
      setTodo([...todo,
        {
          id: maxId + 1,
          title,
          completed: false,
          userId: 1,
          user: usersFromServer.find(user => userValue === user.name) || null,
        },
      ]);

      setTitle('');
      setUserValue('');
    }
  };

  const handleTitle = (element: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(element.target.value);
    setTitleEmpty(false);
  };

  const handleUser = (element: React.ChangeEvent<HTMLSelectElement>) => {
    setUserValue(element.target.value);
    setUserEmpty(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          {'Title: '}
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitle}
          />

          {titleEmpty && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          {'User: '}
          <select
            data-cy="userSelect"
            defaultValue=""
            value={userValue}
            onChange={handleUser}
          >
            <option
              disabled
              value=""
            >
              Choose a user
            </option>
            {usersFromServer.map((user) => (
              <option value={user.name} key={user.name}>{user.name}</option>
            ))}
          </select>

          {userEmpty && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={todo} />
    </div>
  );
};
