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

export const App = () => {
  const [todos, setTodos] = useState(newTodos);
  const [user, setUser] = useState('0');
  const [title, setTitle] = useState('');

  const [invalidUser, setInvalidUser] = useState(false);
  const [invalidTitle, setInvalidTitle] = useState(false);

  const handleChangeUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setUser(value);
    setInvalidUser(false);
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setTitle(value);
    setInvalidTitle(false);
  };

  const resetForm = () => {
    setTitle('');
    setUser('0');
  };

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let invalidValues = false;
    const titleOnlyWithLetters = title.replace(/[0-9]/g, '');

    if (!titleOnlyWithLetters) {
      setInvalidTitle(true);
      invalidValues = true;
    }

    if (user === '0') {
      setInvalidUser(true);
      invalidValues = true;
    }

    if (invalidValues) {
      return;
    }

    const findUser = usersFromServer.find(({ id }) => id === +user);
    const newId = Math.max(...todos.map(({ id }) => id)) + 1;

    if (findUser) {
      setTodos([
        ...todos,
        {
          id: newId,
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

          {invalidTitle && (
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

          {invalidUser && (
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
