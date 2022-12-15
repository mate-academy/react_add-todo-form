import './App.scss';

import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [newTodos, setNewTodos] = useState(todos);
  const [invalidInput, setInvalidInput] = useState(false);
  const [invalidSelect, setInvalidSelect] = useState(false);
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState('0');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement
  | HTMLSelectElement>) => {
    const {
      name,
      value,
    } = event.target;

    switch (name) {
      case 'titleInput':
        setTitle(value);
        setInvalidInput(false);
        break;

      case 'userSelect':
        setSelectedUser(value);
        setInvalidSelect(false);
        break;

      default:
        break;
    }
  };

  const submitChanges = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if ((title === '') && (selectedUser === '0')) {
      setInvalidInput(true);
      setInvalidSelect(true);

      return;
    }

    if (title === '') {
      setInvalidInput(true);

      return;
    }

    if (selectedUser === '0') {
      setInvalidSelect(true);

      return;
    }

    setNewTodos([
      ...newTodos,
      {
        id: (Math.max(...newTodos.map(todo => todo.id)) + 1),
        title,
        completed: false,
        userId: +selectedUser,
        user: getUser(+selectedUser),
      },
    ]);

    setInvalidInput(false);
    setInvalidSelect(false);
    setTitle('');
    setSelectedUser('0');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={submitChanges}
      >
        <div className="field">
          <label htmlFor="titleInput">Title: </label>

          <input
            type="text"
            id="title"
            name="titleInput"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleChange}
          />
          {invalidInput
            && (<span className="error">Please enter a title</span>)}
        </div>

        <div className="field">
          <label htmlFor="titleInput">User: </label>

          <select
            data-cy="userSelect"
            name="userSelect"
            value={selectedUser}
            onChange={handleChange}
          >
            <option
              value="0"
              key="0"
              disabled
            >
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {invalidSelect
            && (<span className="error">Please choose a user</span>)}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={newTodos} />
    </div>
  );
};
