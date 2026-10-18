import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { User } from './types/User';

function getUserById(userId: number): User | null {
  return usersFromServer.find((user: User) => user.id === userId) || null;
}

const initialTodos: Todo[] = todosFromServer.map(
  (todo): Todo => ({
    ...todo,
    user: getUserById(todo.userId),
  }),
);

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [title, setTitle] = useState<string>('');
  const [userId, setUserId] = useState<number>(0);
  const [hasTitleError, setHasTitleError] = useState<boolean>(false);
  const [hasUserError, setHasUserError] = useState<boolean>(false);

  const handleTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    // only letters (ua, en), digits and spaces are allowed
    setTitle(event.target.value.replace(/[^a-zA-Zа-яА-ЯіІїЇєЄґҐ0-9\s]/g, ''));
    setHasTitleError(false);
  };

  const handleUserChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    setUserId(Number(event.target.value));
    setHasUserError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const isTitleEmpty: boolean = title.trim() === '';
    const isUserEmpty: boolean = userId === 0;

    setHasTitleError(isTitleEmpty);
    setHasUserError(isUserEmpty);

    if (isTitleEmpty || isUserEmpty) {
      return;
    }

    const maxId: number = Math.max(0, ...todos.map((todo: Todo) => todo.id));

    const newTodo: Todo = {
      id: maxId + 1,
      title: title.trim(),
      completed: false,
      userId,
      user: getUserById(userId),
    };

    setTodos((current: Todo[]): Todo[] => [...current, newTodo]);
    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            id="user"
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map((user: User) => (
              <option key={user.id} value={user.id}>
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
