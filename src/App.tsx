import './App.scss';
import { FC, useState } from 'react';

import usersFromServer from './api/users';

import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

import {
  findUserById,
  preparedTodos,
  newTodoId,
} from './Helpers';

export const App: FC = () => {
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState(0);
  const [isTitleError, setisTitleError] = useState(false);
  const [isUserError, setisUserError] = useState(false);
  const [todos, setTodos] = useState(preparedTodos);

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title.trim()) {
      setisTitleError(true);
    }

    if (!selectedUser) {
      setisUserError(true);
    }

    if (!title.trim() || !selectedUser) {
      return;
    }

    const newTodo: Todo = {
      id: newTodoId,
      title: title.trim(),
      completed: false,
      userId: Number(selectedUser),
      user: findUserById(Number(selectedUser)),
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setSelectedUser(0);
  };

  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setisTitleError(false);
  };

  const changeUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(Number(event.target.value));
    setisUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={submitForm}
      >
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={changeTitle}
            />
          </label>
          {isTitleError && (
            <span className="error">Please enter a title</span>)}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={selectedUser}
              onChange={changeUser}
            >
              <option value="0" disabled>
                Choose a user
              </option>

              {usersFromServer.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {isUserError && (
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
      <TodoList todos={todos} />
    </div>
  );
};
