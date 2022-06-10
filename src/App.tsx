import React, { useState } from 'react';
import classNames from 'classnames';
import './App.scss';

import todos from './api/todos';
import users from './api/users';
import { TodoList } from './components/TodoList/TodoList';
import { PreparedTodo, User } from './react-app-env';
import 'bulma/css/bulma.min.css';

const getUserById = (userId: number): User | null => {
  return users.find(user => user.id === userId) || null;
};

const preparedTodos: PreparedTodo[] = todos.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

const App: React.FC = () => {
  const [todosBase, setTodosBase] = useState([...preparedTodos]);
  const [newTitle, setNewTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [invalidCharsError, setInvalidCharsError] = useState(false);
  const [selectedUser, setSelectedUser] = useState(0);
  const [hasUserError, setHasUserError] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const setTitleFunction = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (!/^[а-яА-ЯіІ'їЇa-z0-9A-Z\s]*$/.test(value)) {
      setInvalidCharsError(true);

      return;
    }

    setNewTitle(value);
    setHasTitleError(false);
    setInvalidCharsError(false);
  };

  const setUserFunction = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(+event.target.value);
    setHasUserError(false);
  };

  const submitter = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasTitleError(!newTitle);
    setHasUserError(!selectedUser);

    if (newTitle && selectedUser) {
      const newTodo = {
        userId: +selectedUser,
        id: todosBase.length + 1,
        title: newTitle,
        completed: isCompleted,
        user: getUserById(+selectedUser),
      };

      setTodosBase([newTodo, ...todosBase]);
      setNewTitle('');
      setSelectedUser(0);
      setIsCompleted(false);
    }
  };

  return (
    <main className="App box has-background-info">
      <h1 className="title is-2 has-text-white">
        List of Todos
      </h1>
      <form
        className="
          App__form box p-3
          is-flex
          is-flex-direction-column
          is-align-items-center
          has-background-info-light"
        onSubmit={submitter}
      >
        <div>
          <input
            className={classNames('input mb-2', {
              'is-link': !hasTitleError,
              'is-danger': hasTitleError || invalidCharsError,
            })}
            type="text"
            value={newTitle}
            placeholder="Enter the title"
            onChange={setTitleFunction}
          />
          {hasTitleError && (
            <span
              className="has-text-danger"
            >
              Please enter the title!
            </span>
          )}
          {invalidCharsError && (
            <span
              className="has-text-danger"
            >
              Enter digits, spaces, &apos;ua&apos; or &apos;en&apos; letters
            </span>
          )}
        </div>
        <div
          className={classNames('select mb-2', {
            'is-link': !hasUserError,
            'is-danger': hasUserError,
          })}
        >
          <select
            value={selectedUser}
            onChange={setUserFunction}
          >
            <option value="0" disabled>Choose a user</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </div>
        {hasUserError && (
          <span
            className="has-text-danger"
          >
            Please choose a user!
          </span>
        )}

        <div className="mb-2">
          <input
            className="checkbox mr-2"
            id="completed"
            type="checkbox"
            checked={isCompleted}
            onChange={() => setIsCompleted(!isCompleted)}
          />
          <label
            className="checkbox subtitle is-4"
            htmlFor="completed"
          >
            completed
          </label>
        </div>
        <button
          className="button is-link"
          type="submit"
        >
          Add
        </button>
      </form>
      <TodoList todosBase={todosBase} />
    </main>
  );
};

export default App;
