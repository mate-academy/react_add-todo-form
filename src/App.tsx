import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import todosFromServer from './api/todos';
import { Todo } from './types/todo';
import { User } from './types/user';

const getMaxId = (todos: Todo[]) =>
  todos.length ? Math.max(...todos.map(todo => todo.id)) : 0;

export const App = () => {
  const [todos, setTodos] = useState(
    todosFromServer.map(todo => ({
      ...todo,
      user: usersFromServer.find(user => user.id === todo.userId)!,
    })),
  );

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    if (titleError) {
      setTitleError(false);
    }
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
    if (userError) {
      setUserError(false);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    let hasError = false;

    if (!title.trim()) {
      setTitleError(true);
      hasError = true;
    }

    if (!userId) {
      setUserError(true);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const user = usersFromServer.find(u => u.id === userId);
    const newTodo: Todo & { user: User } = {
      id: getMaxId(todos) + 1,
      title: title.trim(),
      completed: false,
      userId,
      user: user!,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setUserId(0);
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
            onChange={handleTitleChange}
            placeholder="Enter a title"
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
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
