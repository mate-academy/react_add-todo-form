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
  const [userSelected, setUserSelect] = useState(0);
  const [IsInput, setInput] = useState('');
  const [hasNoInput, setHasNoInput] = useState(true);
  const [todos, setTodo] = useState<Todo[]>(prepearedTodos);

  const newId = Math.max(...todosFromServer.map((todo) => todo.id + 1));

  const addTodo = () => {
    const newUser = usersFromServer.find(user => user.id === userSelected);

    if (newUser) {
      const newTodo = {
        id: newId,
        title: IsInput,
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
    setInput('');
    setUserSelect(0);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!IsInput || !userSelected) {
      setHasNoInput(false);

      return;
    }

    addTodo();
    clearFields();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    return setInput(value);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    return setUserSelect(+value);
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
            value={IsInput}
            onChange={handleInputChange}
            placeholder="Enter a title"
          />
          </label>
          {(!hasNoInput && !IsInput)
              && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            {'User: '}
          <select
            value={userSelected}
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

          {(!hasNoInput && !userSelected)
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
