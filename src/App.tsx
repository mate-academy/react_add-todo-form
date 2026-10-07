import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { User, Todo } from './types';

const typedUsers: User[] = usersFromServer;
const typedTodos: Todo[] = todosFromServer;

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [todos, setTodos] = useState<Todo[]>(typedTodos);

  // Розділяємо помилки на окремі стани
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const getUser = (id: number): User | undefined => {
    return typedUsers.find(user => user.id === Number(id));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isTitleError = !title.trim();
    const isUserError = userId === 0;

    setHasTitleError(isTitleError);
    setHasUserError(isUserError);

    if (isTitleError || isUserError) {
      return;
    }

    const selectedUser = typedUsers.find(user => user.id === Number(userId));

    const newTodo: Todo = {
      id: Math.max(...todos.map(t => t.id)) + 1,
      title: title.trim(),
      userId: Number(userId),
      completed: false,
      user: selectedUser,
    } as Todo & { user?: User };

    setTodos([...todos, newTodo]);

    setTitle('');
    setUserId(0);
    setHasTitleError(false);
    setHasUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setHasTitleError(false);
            }}
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            id="title"
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="select">User: </label>
          <select
            data-cy="userSelect"
            id="select"
            value={userId}
            onChange={event => {
              setUserId(Number(event.target.value));
              setHasUserError(false);
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {typedUsers.map(user => (
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

      <TodoList todos={todos} getUser={getUser} />
    </div>
  );
};
