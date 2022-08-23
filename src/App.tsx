import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types/Todo';

const preparedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId) || null,
}));

export const App: React.FC = () => {
  const [visibleTodos, setTodos] = useState([...preparedTodos]);
  const [title, setTitle] = useState('');
  const [isComplited, setIsComplited] = useState(false);
  const [selectedUser, setSelectedUser] = useState(0);
  const [hasUserError, setHasUserError] = useState(false);
  const [hasTitleError, setHasTitleError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value.replace(/[^a-zA-Z0-9А-Яа-я\s]/g, ''));
    setHasTitleError(false);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(+event.target.value);
    setHasUserError(false);
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim().length) {
      setHasTitleError(true);
    }

    if (!selectedUser) {
      setHasUserError(true);
    }

    if (title.trim().length && selectedUser) {
      const newTodo = {
        userId: selectedUser || 0,
        id: visibleTodos[visibleTodos.length - 1].id + 1,
        title: title.trim(),
        completed: isComplited,
        user: usersFromServer.find(user => user.id === selectedUser) || null,
      };

      setTodos([...visibleTodos, newTodo]);
      setIsComplited(false);
      setTitle('');
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
          <span>Title </span>
          <input
            type="text"
            data-cy="titleInput"
            name="todoTitle"
            placeholder="Enter title"
            value={title}
            onChange={handleTitleChange}
          />
          {hasTitleError && (
            <span className="error">Please enter the title</span>
          )}
        </div>

        <div className="field">
          <span>User </span>
          <select
            data-cy="userSelect"
            name="todoUser"
            value={selectedUser}
            onChange={handleNameChange}
          >
            <option value={0} disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasUserError && (
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
