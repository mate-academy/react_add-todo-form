import './App.scss';

import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types';

const getUserById = (todoUserId: number) => (
  usersFromServer.find(user => user.id === todoUserId)
);

const todosWithUser: Todo[] = todosFromServer.map(todo => (
  {
    ...todo,
    user: getUserById(todo.userId),
  }
));

export const App = () => {
  const [todos, setTodos] = useState(todosWithUser);

  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);

  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedUserError, setSelectedUserError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleUserSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
    setSelectedUserError(false);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setTitleError(!title.trim());
    setSelectedUserError(selectedUserId === 0);

    if (title && selectedUserId !== 0) {
      const maxId = Math.max(...todos.map(todo => todo.id));

      const newTodo: Todo = {
        id: maxId + 1,
        title,
        completed: false,
        userId: selectedUserId,
        user: getUserById(selectedUserId),
      };

      setTodos([...todos, newTodo]);
      setTitle('');
      setSelectedUserId(0);
    }
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
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
          />

          {
            titleError
              && <span className="error">Please enter a title</span>
          }
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={handleUserSelect}
          >
            <option value="0">Choose a user</option>
            {usersFromServer.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {
            selectedUserError
              && <span className="error">Please choose a user</span>
          }
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
