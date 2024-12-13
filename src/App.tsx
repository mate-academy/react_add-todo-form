import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import React, { useState } from 'react';

type User = {
  id: number;
  name: string;
  email: string;
};

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user?: User | null;
};

type Props = {
  onSubmit: (todo: Todo) => void;
};

function getUserById(userId: number): User | null {
  return usersFromServer.find((user: User) => user.id === userId) || null;
}

export const todos: Todo[] = todosFromServer.map((todo: Todo) => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC<Props> = () => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const [todosList, setTodosList] = useState<Todo[]>(todos);

  const [nextId, setNextId] = useState(
    Math.max(...todos.map(todo => todo.id), 0) + 1,
  );

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const addTodo = (newTodo: Todo) => {
    setTodosList(currentTodo => [...currentTodo, newTodo]);
    setNextId(prevId => prevId + 1);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    const newTodo: Todo = {
      id: nextId,
      completed: false,
      title,
      userId,
      user: getUserById(userId),
    };

    addTodo(newTodo);

    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <div className="field">
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

        <label htmlFor="user">User</label>
        <div className="field">
          <select
            id="user"
            data-cy="userSelect"
            value={userId}
            onChange={handleUserIdChange}
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

          {hasUserIdError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todosList} />
    </div>
  );
};
