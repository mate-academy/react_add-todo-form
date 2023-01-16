import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { Todo } from './Types/Todo';
import { User } from './Types/User';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const findUserById = (userId: number) => (
  usersFromServer.find(user => user.id === userId) as User
);

const allTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: findUserById(todo.userId),
}));

export const App: React.FC<{}> = () => {
  const [title, setTitle] = useState('');
  const [currUser, selectUser] = useState('');
  const [todos, setTodos] = useState(allTodos);
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorUser, setErrorUser] = useState(false);

  const getMaxId = Math.max(...todos.map(todo => todo.id)) + 1;

  const addUser = () => {
    setErrorTitle(!title);
    setErrorUser(!currUser);

    if (title && currUser) {
      setTodos([
        ...todos,
        {
          id: getMaxId,
          title,
          completed: false,
          userId: +currUser,
          user: findUserById(+currUser),
        },
      ]);

      selectUser('');
      setTitle('');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          addUser();
        }}
      >
        <div className="field">
          <label htmlFor="titleInput">Title: </label>

          <input
            id="titleInput"
            type="text"
            value={title}
            data-cy="titleInput"
            placeholder="ex: clean badroom"
            onChange={(event) => {
              setTitle(event.target.value);
              setErrorTitle(false);
            }}
          />

          {errorTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="selectInput">User: </label>
          <select
            id="selectInput"
            data-cy="userSelect"
            value={currUser}
            onChange={(event) => {
              selectUser(event.target.value);
              setErrorUser(false);
            }}
          >
            <option value="" disabled>Choose a user</option>

            {usersFromServer.map(user => (
              <option value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {errorUser && (
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
