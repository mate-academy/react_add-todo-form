import './App.scss';
import React, { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './Types';
import { TodoList } from './components/TodoList';
import { getBiggestId } from './utils/getBiggestId';
import { getUserById } from './utils/getUserById';

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);

  const [titleError, setTitleError] = useState('');
  const [selectUserError, setSelectUserError] = useState('');

  const [allTodos, setAllTodos] = useState<Todo[]>(todos);

  function reset() {
    setTitleError('');
    setSelectUserError('');
    setTitle('');
    setSelectedUserId(0);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      setTitleError('enter a title');
    }

    if (!selectedUserId) {
      setSelectUserError('choose a user');
    }

    if (title && selectedUserId) {
      const newTodo: Todo = {
        id: getBiggestId(allTodos) + 1,
        title,
        completed: false,
        userId: +selectedUserId,
        user: usersFromServer.find(user => +selectedUserId === user.id) || null,
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
            value={selectedUserId}
            onChange={event => setSelectedUserId(+event.target.value)}
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

          {!Boolean(selectedUserId) && selectUserError && (
            <span className="error">Please {selectUserError}</span>
          )}
        </div>
        <p> eafcef </p>
        <p> schiwcj </p>
        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={allTodos} />
    </div>
  );
};
