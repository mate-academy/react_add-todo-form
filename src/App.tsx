import React, { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';
import './App.scss';

const getUserById = (userId: number): User | null => {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
};

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [currentTodos, setTodo] = useState(todos);
  const [errorUser, setErrorUser] = useState(false);
  const [errorTitle, setErrorTitle] = useState(false);

  const handleAddButton = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name) {
      setErrorUser(true);
    }

    if (!title) {
      setErrorTitle(true);
    }

    if (!title || !name) {
      return;
    }

    const selectedUser = usersFromServer.find(user => user.name === name);
    const maxId = Math.max(...todos.map(todo => todo.id));

    if (selectedUser) {
      const newTodo = [
        ...currentTodos,
        {
          id: maxId + 1,
          title,
          userId: maxId + 1,
          completed: false,
          user: {
            id: maxId + 1,
            name,
            username: selectedUser.username,
            email: selectedUser.email,
          },
        },
      ];

      setTodo(newTodo);
      setName('');
      setTitle('');
    }
  };

  const checkCharacter = (char: string) => {
    const eng = /^[ 0-9A-Za-z]*$/.test(char);
    const ru = /^[ 0-9А-Яа-я]*$/.test(char);

    return eng || ru;
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (checkCharacter(value)) {
      setTitle(value);
      setErrorTitle(false);
    }
  };

  const handleChangeUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setName(event.target.value);
    setErrorUser(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleAddButton}
      >
        <div className="field">
          <span>Title: </span>
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleChangeTitle}
          />
          {errorTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <span>User: </span>
          <select
            data-cy="userSelect"
            value={name}
            onChange={handleChangeUser}
          >
            <option value="" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>
          {errorUser && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={currentTodos} />
    </div>
  );
};
