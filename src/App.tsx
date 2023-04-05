import { useEffect, useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';

import { TodoList } from './components/TodoList/TodoList';

function getUser(userId: number): User | undefined {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || undefined;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [selectedTitle, setTitle] = useState('');
  const [selectedUser, setUser] = useState('');
  const [addNewTodo, setTodo] = useState(todos);
  const [validationTitle, setValTitle] = useState(true);
  const [validationUser, setValUser] = useState(true);

  const clearForm = () => {
    setTitle('');
    setUser('');
  };

  useEffect(() => {
    return () => {
      return clearForm();
    };
  }, [addNewTodo]);

  useEffect(() => {
    setValTitle(true);
  }, [selectedTitle]);

  useEffect(() => {
    setValUser(true);
  }, [selectedUser]);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <div className="field">
          <label htmlFor="titleId">
            Title:
          </label>
          <input
            type="text"
            data-cy="titleInput"
            name="titleId"
            value={selectedTitle}
            placeholder="Please enter a title"
            onChange={event => {
              const { target } = event;

              setTitle(target.value);
            }}
          />

          {!validationTitle
          && (<span className="error">Please enter a title</span>)}
        </div>

        <div className="field">
          <label htmlFor="userSelectedId">
            User:
          </label>

          <select
            name="userSelectedId"
            data-cy="userSelect"
            value={selectedUser}
            onChange={event => {
              const { target } = event;

              setUser(target.value);
            }}
          >
            <option value="" disabled>Choose a user</option>

            {usersFromServer.map(user => (
              <option
                key={user.id}
                value={user.name}
              >
                {user.name}
              </option>
            ))}
          </select>

          {!validationUser
          && (<span className="error">Please choose a user</span>)}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={() => {
            const findUser = usersFromServer.find(
              user => user.name === selectedUser,
            );

            const largeId = [...todos].sort(
              (a, b) => a.id - b.id,
            )[todos.length - 1].id;

            const newTodo = {
              id: largeId + 1,
              title: selectedTitle,
              completed: false,
              userId: findUser?.id && undefined,
              user: findUser,
            };

            const newAdd = [...addNewTodo];

            newAdd.push(newTodo);

            if (selectedTitle && selectedUser) {
              setTodo(newAdd);
            }

            if (!selectedTitle) {
              setValTitle(false);
            }

            if (!selectedUser) {
              setValUser(false);
            }
          }}
        >
          Add
        </button>
      </form>

      <TodoList todos={addNewTodo} />
    </div>
  );
};
