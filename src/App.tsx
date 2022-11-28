import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [titleInput, setTitleInput] = useState('');
  const [selectedUser, setSelectedUser] = useState(0);
  const [visibleTodos, setVisibleTodos] = useState(todos);
  const [isTitleError, setIsTitleError] = useState(false);
  const [isUserError, setIsUserError] = useState(false);

  const handleTitleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleInput(event.target.value);
    setIsTitleError(false);
  };

  const handleSelectedUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(+event.target.value);
    setIsUserError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setIsTitleError(titleInput.trim() === '');
    setIsUserError(selectedUser === 0);

    if (!titleInput.trim() || !selectedUser) {
      return;
    }

    const newTodo: Todo = {
      id: visibleTodos.reduce((maxId, todo) => Math.max(maxId, todo.id), 0) + 1,
      userId: selectedUser,
      title: titleInput,
      completed: false,
      user: getUser(selectedUser),
    };

    setVisibleTodos(prevState => [
      ...prevState,
      newTodo,
    ]);
    setTitleInput('');
    setSelectedUser(0);
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
            name="titleInput"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={titleInput}
            onChange={handleTitleInput}
          />

          {isTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            id="userSelect"
            name="userSelect"
            data-cy="userSelect"
            value={selectedUser}
            onChange={handleSelectedUser}
          >
            <option value={0} disabled>Choose a user</option>
            {usersFromServer.map(user => {
              const { id, name } = user;

              return (
                <option
                  key={id}
                  value={id}
                >
                  {name}
                </option>
              );
            })}
          </select>

          {isUserError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
