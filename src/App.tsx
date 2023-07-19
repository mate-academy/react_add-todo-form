import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types';

const getUserById = (userId: number) => (
  usersFromServer.find(user => user.id === userId)
);

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [showTitleError, setShowTitleError] = useState(false);
  const [selectedUser, setSelectedUser] = useState(0);
  const [showUserError, setShowUserError] = useState(false);
  const [currentTodos, setCurrentTodos] = useState(todos);

  const getNewTodoId = () => (
    Math.max(...currentTodos.map(todo => +todo.id)) + 1
  );

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title || !selectedUser) {
      setShowTitleError(!title);
      setShowUserError(!selectedUser);

      return;
    }

    const newTodo = {
      id: getNewTodoId(),
      title,
      completed: false,
      userId: selectedUser,
      user: getUserById(selectedUser),
    };

    setCurrentTodos([...currentTodos, newTodo]);
    setTitle('');
    setSelectedUser(0);
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setShowTitleError(false);
  };

  const handleUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(+event.target.value);
    setShowUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleFormSubmit}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitle}
          />
          {showTitleError
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            id="user"
            data-cy="userSelect"
            onChange={handleUser}
            value={selectedUser}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {showUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={currentTodos} />
    </div>
  );
};
