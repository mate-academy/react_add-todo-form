import React, { useState } from 'react';

import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './components/types/User';
import { Todo } from './components/types/Todo';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const prepearedTodos: Todo[] = todosFromServer.map((todo) => ({
  ...todo,
  user: getUser(todo.userId) || null,
}));

export const App: React.FC = () => {
  const [userSelectedId, setUserSelectId] = useState(0);
  const [title, setTitle] = useState('');
  const [hasNoInput, setHasNoInput] = useState(true);
  const [todos, setTodo] = useState<Todo[]>(prepearedTodos);

  const newId = Math.max(...todosFromServer.map((todo) => todo.id + 1));

  const addTodo = () => {
    const newUser = usersFromServer.find(user => user.id === userSelectedId);

    if (newUser) {
      const newTodo = {
        id: newId,
        title,
        completed: false,
        userId: newUser.id,
        user: newUser,
      };

      setTodo([
        ...todos,
        newTodo,
      ]);
    }
  };

  const clearFields = () => {
    setHasNoInput(true);
    setTitle('');
    setUserSelectId(0);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title || !userSelectedId) {
      setHasNoInput(false);

      return;
    }

    addTodo();
    clearFields();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (value !== ' ') {
      return setTitle(value.replace(/[^A-Za-z0-9\s^А-яЁё]/i, ''));
    }

    return 0;
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    return setUserSelectId(+value);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST" onSubmit={handleSubmit}>
        <div className="field">

          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              value={title}
              onChange={handleInputChange}
              placeholder="Enter a title"
            />
          </label>
          {(!hasNoInput && !title)
              && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              value={userSelectedId}
              data-cy="userSelect"
              onChange={handleSelectChange}
            >
              <option
                value="0"
                disabled
              >
                Choose a user
              </option>

              {usersFromServer.map((user) => {
                return (
                  <option
                    key={user.id}
                    value={user.id}
                  >
                    {user.name}
                  </option>
                );
              })}
            </select>
          </label>

          {(!hasNoInput && !userSelectedId)
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
