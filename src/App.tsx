import React, { useState } from 'react';
import './App.scss';
import users from './api/users';
import { TodoList } from './components/TodoList';
import { initialTodos } from './services/preparedTodos';
import { Todo } from './types/Todo';
import { getUserById } from './services/getUserById';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState(0);

  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasSelectUserError, setSelectUserError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value.trimStart());
    setHasTitleError(false);
  };

  const handleUserSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(+event.target.value);
    setSelectUserError(false);
  };

  const handleSumbmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setSelectUserError(!selectedUser);

    if (!title || !selectedUser) {
      return;
    }

    setHasTitleError(false);
    setSelectUserError(false);
    setTitle('');
    setSelectedUser(0);

    const maxId = Math.max(...todos.map(todo => todo.id));

    setTodos([
      ...todos,
      {
        user: getUserById(selectedUser),
        id: maxId + 1,
        title,
        completed: false,
      },
    ]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSumbmit}
      >
        <div className="field">
          <input
            type="text"
            placeholder="Enter a title"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
            onBlur={() => setHasTitleError(!title)}
          />

          {
            hasTitleError
            && (
              <span className="error">
                Please enter a title
              </span>
            )
          }
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUser}
            onChange={handleUserSelect}
          >
            <option value="0" disabled>Choose a user</option>
            {users.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {
            hasSelectUserError
            && (
              <span className="error">Please choose a user</span>
            )
          }
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList
        todos={todos}
      />
    </div>
  );
};
