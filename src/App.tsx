import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { TodoList } from './components/TodoList';
import './App.scss';

const getUser = (value: number | string): User | null => {
  switch (typeof value) {
    case 'number':
      return usersFromServer.find((user) => user.id === value) || null;

    case 'string':
      return usersFromServer.find((user) => user.name === value) || null;

    default:
      return null;
  }
};

const todosWithUsers: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [todos, setTodos] = useState(todosWithUsers);
  const [isTitleInvalid, setIsTitleInvalid] = useState(false);
  const [isUserInvalid, setIsUserInvalid] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitleInvalid(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(event.target.value);
    setIsUserInvalid(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      setIsTitleInvalid(true);
    }

    if (!selectedUser) {
      setIsUserInvalid(true);
    }

    if (!selectedUser || !title) {
      return;
    }

    const lastTodoId = Math.max(...todos.map(todo => todo.id));
    const userForNewTodo = getUser(selectedUser);

    setTodos([
      ...todos,
      {
        id: lastTodoId + 1,
        title,
        completed: false,
        userId: userForNewTodo?.id,
        user: userForNewTodo,
      },
    ]);

    setTitle('');
    setSelectedUser('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="TODO"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              value={title}
              onChange={handleTitleChange}
              placeholder="Enter a title"
            />
          </label>

          {isTitleInvalid && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={selectedUser}
              onChange={handleUserChange}
            >
              <option value="" disabled>Choose a user</option>

              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {isUserInvalid && (
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
