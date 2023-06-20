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
  const [selectedUser, setselectedUser] = useState('');
  const [todos, setTodos] = useState(todosWithUsers);
  const [isTitleError, setIsTitleError] = useState(false);
  const [isUserSelectError, setIsUserSelectError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setTitle(value);
    setIsTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setselectedUser(value);
    setIsUserSelectError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      setIsTitleError(true);
    }

    if (!selectedUser) {
      setIsUserSelectError(true);
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
    setselectedUser('');
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

          {isTitleError && (
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
                <option value={user.name} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {isUserSelectError && (
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
