import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import React, { useState } from 'react';

const todos = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId) ?? null,
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [touchedTitle, setTouchedTitle] = useState(false);
  const [touchedUser, setTouchedUser] = useState(false);
  const [userId, setUserId] = useState(0);
  const [todosList, setTodosList] = useState(todos);
  const hasErrorTitle = touchedTitle && !title.trim();
  const hasErrorUser = touchedUser && !userId;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouchedTitle(true);
    setTouchedUser(true);

    if (!title.trim() || !userId) {
      return;
    }

    const currentMaxId = todosList.reduce(
      (max, todo) => Math.max(max, todo.id),
      0,
    );
    const getNewId = currentMaxId + 1;

    const getUser = usersFromServer.find(user => user.id === userId) ?? null;
    const newTodo = {
      id: getNewId,
      title,
      userId,
      completed: false,
      user: getUser,
    };

    setTodosList([...todosList, newTodo]);

    setTitle('');
    setUserId(0);
    setTouchedTitle(false);
    setTouchedUser(false);
  }

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newUserId = Number(event.target.value);

    setUserId(newUserId);

    if (touchedUser && newUserId !== 0) {
      setTouchedUser(false);
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;

    setTitle(newTitle);

    // зняти помилку лише для title
    if (touchedTitle && newTitle.trim()) {
      setTouchedTitle(true);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder="Enter a title"
            onBlur={() => setTouchedTitle(true)}
            onChange={handleInput}
          />
          {hasErrorTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            onBlur={() => setTouchedUser(true)}
            value={userId}
            onChange={handleSelect}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasErrorUser && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todosList} />
    </div>
  );
};
