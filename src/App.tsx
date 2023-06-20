import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todo } from './types/Todo';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find((user: User) => (
    user.id === userId
  ));

  return foundUser || null;
}

const visibleTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(0);
  const [validTitle, setValidTitle] = useState(false);
  const [validName, setValidName] = useState(false);
  const [todos, setTodos] = useState(visibleTodos);

  const handleQueryChange = ((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);

    setValidTitle(false);
  });

  const handleSelectChange = ((event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(+event.target.value);

    setValidName(false);
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!searchQuery.length && selectedUser === 0) {
      setValidTitle(true);
      setValidName(true);

      return;
    }

    if (selectedUser === 0) {
      setValidName(true);

      return;
    }

    if (!searchQuery.length) {
      setValidTitle(true);

      return;
    }

    const newTodo = {
      id: Math.max(...todos.map(todo => todo.id)) + 1,
      title: searchQuery,
      completed: false,
      userId: selectedUser,
      user: getUser(selectedUser),
    };

    if (searchQuery.trim() && selectedUser) {
      setTodos(
        [...todos, newTodo],
      );

      setSearchQuery('');
      setSelectedUser(0);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            id="titleInput"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={searchQuery}
            onChange={handleQueryChange}
          />
          {validTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            data-cy="userSelect"
            id="userSelect"
            value={selectedUser}
            onChange={handleSelectChange}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {validName && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
