import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User;
};

export const App = () => {
  const preparedTodos: Todo[] = todosFromServer.map(todo => ({
    ...todo,
    user: usersFromServer.find(user => user.id === todo.userId)!,
  }));

  const [todos, setTodos] = useState<Todo[]>(preparedTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const users = usersFromServer.map(user => ({
    name: user.name,
    value: user.id,
  }));

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    let hasError = false;

    if (title.trim() === '') {
      setTitleError(true);
      hasError = true;
    }

    if (userId === 0) {
      setUserError(true);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const user = usersFromServer.find(
      currentUser => currentUser.id === userId,
    )!;
    const maxId = todos.length ? Math.max(...todos.map(todo => todo.id)) : 0;
    const newId = maxId + 1;

    const newTodo = {
      id: newId,
      title: title.trim(),
      completed: false,
      userId: userId,
      user: user,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);

    setTitle('');
    setUserId(0);
    setTitleError(false);
    setUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="todo-title" className="label">
            Title
          </label>

          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={event => {
              const cleanValue = event.target.value.replace(
                /[^a-zA-Zа-яА-ЯіїєґІЇЄҐ0-9\s]/g,
                '',
              );

              setTitle(cleanValue);
              setTitleError(false);
            }}
          />
          {titleError === true && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user-select" className="label">
            User
          </label>

          <select
            data-cy="userSelect"
            value={userId}
            onChange={event => {
              setUserId(+event.target.value);
              setUserError(false);
            }}
          >
            <option value="0">Choose a user</option>

            {users.map(user => (
              <option value={user.value} key={user.value}>
                {user.name}
              </option>
            ))}
          </select>
          {userError === true && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
