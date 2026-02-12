import './App.scss';
import React, { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

export const App = () => {
  const preparedTodos = todosFromServer.map(todo => {
    const user = usersFromServer.find(
      serverUser => serverUser.id === todo.userId,
    );

    return {
      ...todo,
      user,
    };
  });

  const [todos, setTodos] = useState(preparedTodos);
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let hasError = false;

    if (title.trim() === '') {
      setHasTitleError(true);
      hasError = true;
    }

    if (selectedUserId === 0) {
      setHasUserError(true);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const selectedUser = usersFromServer.find(u => u.id === selectedUserId);

    if (!selectedUser) {
      return;
    }

    const maxId = todos.length ? Math.max(...todos.map(todo => todo.id)) : 0;

    const newTodo = {
      id: maxId + 1,
      title: title.trim(),
      completed: false,
      userId: selectedUserId,
      user: selectedUser,
    };

    setTodos(prev => [...prev, newTodo]);

    setTitle('');
    setSelectedUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <span>Title: </span>
          <input
            value={title}
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            onChange={event => {
              setTitle(event.target.value);
              setHasTitleError(false);
            }}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <span>User: </span>
          <select
            value={selectedUserId}
            data-cy="userSelect"
            onChange={event => {
              setSelectedUserId(+event.target.value);
              setHasUserError(false);
            }}
          >
            <option value={0} disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {hasUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
