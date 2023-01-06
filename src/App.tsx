import React, { FC, useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { User } from './types/User';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

const getUserById = (array: User[], id: number) => {
  return array.find(user => user.id === id) || null;
};

const todosWithUsers: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(usersFromServer, todo.userId),
}));

export const App: FC = () => {
  const defaultValueInput = '';

  const [title, setInput] = useState<string>(defaultValueInput);
  const [selectedUserName, setUser] = useState<string>(defaultValueInput);
  const [todos, setTasks] = useState<Todo[]>(todosWithUsers);
  const [errorForTitle, setErrorForTitle] = useState<boolean>(false);
  const [errorForSelect, setErrorForUserSelect] = useState<boolean>(false);

  const clearForm = (defaultValue: string) => {
    setInput(defaultValue);
    setUser(defaultValue);
  };

  const getLargestUserId = (array: Todo[]) => {
    return Math.max(...array.map(item => item.id));
  };

  const getUser = (array: User[]) => {
    return array.find(person => (
      person.name === selectedUserName
    )) || null;
  };

  const handleSubmitForm = (event: React.FormEvent) => {
    event.preventDefault();

    const fieldsNotEmpty = selectedUserName && title;

    if (fieldsNotEmpty) {
      const id = getLargestUserId(todos) + 1;
      const user = getUser(usersFromServer);

      setTasks(currenTodos => [
        ...currenTodos,
        {
          id,
          title,
          completed: false,
          userId: user ? user.id : null,
          user,
        }]);

      clearForm(defaultValueInput);
    }

    if (selectedUserName === defaultValueInput) {
      setErrorForUserSelect(true);
    }

    if (title === defaultValueInput) {
      setErrorForTitle(true);
    }
  };

  const handleUserSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setErrorForUserSelect(false);
    setUser(value);
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setInput(value);
    setErrorForTitle(false);
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
          <label
            htmlFor="titleInput"
          >
            {'Title: '}
          </label>

          <input
            id="titleInput"
            name="titleInput"
            type="text"
            placeholder="Enter a title"
            value={title}
            onChange={handleInput}
            data-cy="titleInput"
          />
          {errorForTitle
            && (<span className="error">Please enter a title</span>)}
        </div>

        <div className="field">
          <label
            htmlFor="userSelect"
          >
            {'User: '}
          </label>

          <select
            onChange={handleUserSelect}
            name="userSelect"
            value={selectedUserName}
            id="userSelect"
            data-cy="userSelect"
          >
            <option value="" disabled>
              Choose a user
            </option>

            {usersFromServer.map((user) => (
              <option
                key={user.id}
                value={user.name}
              >
                {user.name}
              </option>
            ))}
          </select>

          {errorForSelect && (
            <span className="error">Please choose a user</span>
          )}

        </div>

        <button
          data-cy="submitButton"
          type="submit"
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
