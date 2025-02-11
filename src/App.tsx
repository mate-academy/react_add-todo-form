import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import React, { useState } from 'react';

const todos = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [touched, setTouched] = useState(false);
  const [userId, setUserId] = useState(0);
  const [todosList, setTodosList] = useState(todos);
  const hasError = touched && (!title || !userId);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim()) {
      setTouched(true);
    }

    const getNewId = Math.max(...todos.map(todo => todo.id), 0) + 1;

    const user = usersFromServer.find(user => user.id === userId);

    const newTodo = {
      id: getNewId,
      title,
      userId,
      completed: false,
      user: user,
    };

    setTodosList([...todosList, newTodo]);

    setTitle('');
    setUserId(0);
    setTouched(false);
  }

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
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
            onBlur={() => {
              setTouched(true);
            }}
            onChange={handleInput}
          />
        </div>
        {hasError && <span className="error">Please enter a title</span>}

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onBlur={() => setTouched(true)}
            onChange={handleSelect}
          >
            <option value="0" disabled selected>
              Choose a user
            </option>
            {usersFromServer.map(item => (
              <option value={item.id} key={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          {hasError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todosList} />
    </div>
  );
};
