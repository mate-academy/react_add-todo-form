import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { TodoList } from './components/TodoList';

const initialTodos = todosFromServer.map(todo => {
  return {
    ...todo,
    user: usersFromServer.find(user => user.id === todo.userId) || null,
  };
});

export const App = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState('');
  const [hasUserError, setHasUserError] = useState('');

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const normalizedTitle = title.trim();
    let isFormValid = true;

    if (!normalizedTitle) {
      setHasTitleError('Please enter a title');
      isFormValid = false;
    } else {
      setHasTitleError('');
    }

    if (userId === 0) {
      setHasUserError('Please choose a user');
      isFormValid = false;
    } else {
      setHasUserError('');
    }

    if (!isFormValid) {
      return;
    }

    const maxId =
      todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) : 0;
    const nextId = maxId + 1;
    const selectedUser =
      usersFromServer.find(user => user.id === userId) || null;

    const newTodo = {
      id: nextId,
      title: normalizedTitle,
      userId: userId,
      completed: false,
      user: selectedUser,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setUserId(0);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title-input">Title</label>
          <input
            id="title-input"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setHasTitleError('');
            }}
          />
          {hasTitleError && <span className="error">{hasTitleError}</span>}
        </div>

        <div className="field">
          <label htmlFor="user-select">User</label>
          <select
            id="user-select"
            data-cy="userSelect"
            value={userId}
            onChange={event => {
              setUserId(Number(event.target.value));
              setHasUserError('');
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {hasUserError && <span className="error">{hasUserError}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
