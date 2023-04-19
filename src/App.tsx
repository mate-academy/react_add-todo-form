import { useState } from 'react';

import { TodoList } from './components/TodoList';

import { User } from './types/User';
import { Todo } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import './App.scss';

const getUser = (userId: number): User | null => {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
};

const newTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

let maxId = Math.max(...newTodos.map(({ id }) => id));

export const App = () => {
  const [todos, setTodos] = useState(newTodos);
  const [user, setUser] = useState('0');
  const [title, setTitle] = useState('');

  const [isValidUser, setIsValidUser] = useState(true);
  const [isValidTitle, setIsValidTitle] = useState(true);

  const handleChangeUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setUser(value);
    setIsValidUser(true);
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setTitle(value);
    setIsValidTitle(true);
  };

  const resetForm = () => {
    setTitle('');
    setUser('0');
  };

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let isValidValues = true;

    const titleOnlyWithLetters = title.replace(/[0-9]/g, '').trim();

    if (!titleOnlyWithLetters) {
      setIsValidTitle(false);

      isValidValues = false;
    }

    if (user === '0') {
      setIsValidUser(false);

      isValidValues = false;
    }

    if (!isValidValues) {
      return;
    }

    const findUser = usersFromServer.find(({ id }) => id === +user);

    if (findUser) {
      setTodos([
        ...todos,
        {
          id: maxId += 1,
          title: titleOnlyWithLetters,
          completed: false,
          userId: findUser.id,
          user: findUser,
        },
      ]);
    }

    resetForm();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmitForm}
      >
        <div className="field">
          <label>
            Title:
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleChangeTitle}
            />
          </label>

          {!isValidTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            User:
            <select
              data-cy="userSelect"
              value={user}
              onChange={handleChangeUser}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(({ name }, i) => (
                <option value={i + 1} key={name}>
                  {name}
                </option>
              ))}
            </select>
          </label>

          {!isValidUser && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
