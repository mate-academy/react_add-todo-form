import './App.scss';
import React, { useState } from 'react';

import { TodoList } from './components/TodoList';

import { User } from './types/User';
import { Todo } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUserById(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  // if there is no user with a given userId
  return foundUser || null;
}

const addUserTodo: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodo] = useState(addUserTodo);

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [isValidTitle, setIsValidTitle] = useState(false);
  const [isValidUser, setIsValidIUser] = useState(false);

  const handleInputTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;

    const regex = /[^a-zA-Zа-яА-Я0-9\s]+/g;

    const validValue = value.replace(regex, '');

    setTitle(validValue);

    if (validValue) {
      setIsValidTitle(false);
    }
  };

  const handleSelectUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.currentTarget;

    setUserId(+value);

    if (value) {
      setIsValidIUser(false);
    }
  };

  const checkValidate = () => {
    if (!title.trim().length) {
      setIsValidTitle(true);
    }

    if (!userId) {
      setIsValidIUser(true);
    }

    return !title.length || !userId;
  };

  const resetForm = () => {
    setTitle('');
    setUserId(0);
    setIsValidIUser(false);
    setIsValidTitle(false);
  };

  const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (checkValidate()) {
      return;
    }

    const newTodo = {
      id: Math.max(...todos.map(todo => todo.id)) + 1,
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    };

    setTodo([
      ...todos,
      newTodo,
    ]);

    resetForm();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleAddTodo} action="/api/users" method="POST">
        <div className="field">
          {'Title: '}
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleInputTitle}
          />
          {isValidTitle
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          {'User: '}
          <select
            value={userId}
            data-cy="userSelect"
            onChange={handleSelectUser}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(userFromServer => (
              <option
                key={userFromServer.id}
                value={userFromServer.id}
              >
                {userFromServer.name}
              </option>
            ))}
          </select>
          {isValidUser
            && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
