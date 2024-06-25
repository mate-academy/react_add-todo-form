import './App.scss';
import React, { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './Types';
import { TodoList } from './components/TodoList';

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => todo.userId === user.id) || null,
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [selectUser, setSelectUser] = useState(0);

  const [titleError, setTitleError] = useState('');
  const [selectUserError, setSelectUserError] = useState('');
  const [allTodos, setAllTodos] = useState<Todo[]>(todos);

  function reset() {
    setTitleError('');
    setSelectUserError('');
    setTitle('');
    setSelectUser(0);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      setTitleError('enter a title');
    }

    if (!selectUser) {
      setSelectUserError('choose a user');
    }

    if (title && selectUser) {
      const biggestId: number = allTodos.reduce((a, c) =>
        a.id > c.id ? a : c,
      ).id;

      const newTodo: Todo = {
        id: biggestId + 1,
        title,
        completed: false,
        userId: +selectUser,
        user: usersFromServer.find(user => +selectUser === user.id) || null,
      };

      setAllTodos(prevTodos => [...prevTodos, newTodo]);
      reset();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit} action="/api/todos" method="POST">
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
          {titleError && !title && (
            <span className="error">Please {titleError}</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="selectUser">User: </label>
          <select
            id="selectUser"
            data-cy="userSelect"
            value={selectUser}
            onChange={event => setSelectUser(+event.target.value)}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {!Boolean(selectUser) && selectUserError && (
            <span className="error">Please {selectUserError}</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={allTodos} />
    </div>
  );
};
