import './App.scss';
import React, { FormEvent, useState } from 'react';

import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const renderList: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [titleError, setHasTitleError] = useState(false);
  const [title, setTitle] = useState('');
  const [userError, setHasUserError] = useState(false);
  const [selectedUser, setSelectedUser] = useState(0);
  const [todos, setTodos] = useState(renderList);

  const maxId = Math.max(...todos.map((todo) => todo.id));

  const createTodo: Todo = {
    id: maxId + 1,
    userId: selectedUser,
    title,
    completed: false,
    user: getUser(selectedUser),
  };

  const clearSelection = () => {
    setSelectedUser(0);
    setTitle('');
  };

  const handleUserInput = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setHasUserError(false);
    setSelectedUser(+event.target.value);
  };

  const handleTitleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHasTitleError(false);
    setTitle(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!title) {
      setHasTitleError(true);
    }

    if (!selectedUser) {
      setHasUserError(true);
    }

    if (title && selectedUser) {
      setTodos([...todos, createTodo]);
      clearSelection();
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
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleInput}
          />
          {titleError && (
            <span className="error">Please enter a title</span>)}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            placeholder="Choose a user"
            value={selectedUser}
            onChange={handleUserInput}
          >
            <option value="0" disabled>Choose a user</option>
            {
              usersFromServer.map(user => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </option>
              ))
            }
          </select>
          {userError && (
            <span className="error">Please choose a user</span>)}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
