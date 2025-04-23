import './App.scss';
import React, { FormEventHandler, useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

export const App = () => {
  const preparedTodos = todosFromServer.map(todo => ({
    ...todo,
    user: usersFromServer.find(user => user.id === todo.userId),
  }));

  const [todos, setTodos] = useState(preparedTodos);
  const [users] = useState(usersFromServer);
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('0');
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);
  // eslint-disable-next-line
  const handleTitleChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    setTitle(event.target.value);

    if (titleError) {
      setTitleError(false);
    }
  };
  // eslint-disable-next-line
  const handleUserChange: React.ChangeEventHandler<HTMLSelectElement> = event => {
    setSelectedUserId(event.target.value);

    if (userError) {
      setUserError(false);
    }
  };

  const handleSubmit: FormEventHandler = event => {
    event.preventDefault();

    let valid = true;

    if (!title.trim()) {
      setTitleError(true);
      valid = false;
    }

    if (!selectedUserId || selectedUserId === '0') {
      setUserError(true);
      valid = false;
    }

    if (!valid) {
      return;
    }

    const newTodo = {
      id: Math.max(...todos.map(todo => todo.id)) + 1,
      title: title,
      userId: Number(selectedUserId),
      completed: false,
      user: users.find(user => user.id === Number(selectedUserId)),
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setSelectedUserId('0');
    setTitleError(false);
    setUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={handleUserChange}
          >
            <option value="0">Choose a user</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
