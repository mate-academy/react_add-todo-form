import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { Todo } from './components/types/Todo';
import { User } from './components/types/User';
import { TodoList } from './components/TodoList';

const getUser = (userId: number): User | null => {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
};

const todos: Todo[] = todosFromServer.map(todo => {
  return {
    ...todo,
    user: getUser(todo.userId),
  };
});

export const App: React.FC = () => {
  const [todoInfo, setTodoInfo] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('0');
  const [isError, setError] = useState(false);
  const [currentTodos, setTodos] = useState(todos);

  const reset = () => {
    setTodoInfo('');
    setSelectedUserId('0');
    setError(false);
  };

  const handleTodoInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const message = event.target.value.replace(/[^a-zа-яієїґ\s\d]/gi, '');

    setTodoInfo(message);
  };

  const handleUserId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setSelectedUserId(value);
  };

  const addNewTodos = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!todoInfo) {
      setError(true);
      throw new Error('Please enter a title');
    }

    if (selectedUserId === '0') {
      setError(true);
      throw new Error('Choose a user');
    }

    const newTodos: Todo = {
      id: currentTodos.length + 1,
      title: todoInfo,
      completed: false,
      userId: +selectedUserId,
      user: getUser(+selectedUserId),
    };

    setTodos(() => [
      ...currentTodos,
      newTodos,
    ]);

    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={addNewTodos}
      >
        <div className="field">
          <label>
            Title:

            {' '}

            <input
              type="text"
              value={todoInfo}
              onChange={handleTodoInfo}
              placeholder="Enter a title"
              data-cy="titleInput"
            />
            {(isError && !todoInfo) && (
              <span className="error">Please enter a title</span>
            )}
          </label>
        </div>

        <div className="field">
          <label>
            User:

            {' '}

            <select
              name="selectedUser"
              data-cy="userSelect"
              value={selectedUserId}
              onChange={handleUserId}
            >
              <option value="0" disabled>Choose a user</option>

              {usersFromServer.map(user => {
                const { id, name } = user;

                return (
                  <option
                    value={id}
                    key={id}
                  >
                    {name}
                  </option>
                );
              })}
            </select>
            {(isError && selectedUserId === '0') && (
              <span className="error">Please choose a user</span>
            )}
          </label>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={currentTodos} />
    </div>
  );
};
