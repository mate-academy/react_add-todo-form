import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import React, { useState } from 'react';
import { Todo, User } from './types/interfaces';
import { TodoList } from './components/TodoList';

export function addUserToTodo(todos: Todo[], users: User[]): Todo[] {
  return todos.map(todo => {
    return {
      ...todo,
      user: users.find(user => user.id === todo.userId) || undefined,
    };
  });
}

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(
    addUserToTodo(todosFromServer, usersFromServer),
  );

  const [userValue, setUserValue] = useState<string>('0');

  const [title, setTitle] = useState<string>('');

  const [errors, setErrors] = useState<{ title: boolean; user: boolean }>({
    title: false,
    user: false,
  });

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(event.target.value);
    if (errors.title) {
      setErrors(prevErrors => ({ ...prevErrors, title: false }));
    }
  };

  const handleUserValue = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    setUserValue(event.target.value);

    if (errors.user) {
      setErrors(prevErrors => ({ ...prevErrors, user: false }));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (!title || userValue === '0') {
      setErrors({ title: !title, user: userValue === '0' });

      return;
    }

    const newId =
      todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;

    const newTodo: Todo = {
      id: newId,
      title: title,
      userId: Number(userValue),
      completed: false,
      user: usersFromServer.find(user => user.id === Number(userValue)),
    };

    setTodos([...todos, newTodo]);

    setTitle('');
    setUserValue('0');
    setErrors({ title: false, user: false });
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">
            <span>Title: </span>
            <input
              id="title"
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleTitle}
            />
          </label>

          {errors.title && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">
            <span>User: </span>
            <select
              id="user"
              data-cy="userSelect"
              value={userValue}
              onChange={handleUserValue}
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
          </label>

          {errors.user && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
