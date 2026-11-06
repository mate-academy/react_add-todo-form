import './App.scss';

import React, { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { User } from './types';
import { Todo } from './types';
import { TodoWithUser } from './types';

const DEFAULT_TODO_VALUE: Todo = {
  id: 0,
  title: '',
  completed: false,
  userId: 0,
};

export const App: React.FC = () => {
  const [newTodo, setNewTodo] = useState<Todo>(DEFAULT_TODO_VALUE);
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const [count, setCount] = useState(
    Math.max(...todosFromServer.map(todo => todo.id)) + 1,
  );
  const [hasTitleError, setHasTitleError] = useState<boolean>(false);
  const [hasUserError, setHasUserError] = useState<boolean>(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo({
      ...newTodo,
      title: event.target.value,
    });
    setHasTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNewTodo({
      ...newTodo,
      userId: +event.target.value,
    });
    setHasUserError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (newTodo.title.trim() === '') {
      setHasTitleError(true);
    }

    if (newTodo.userId === 0) {
      setHasUserError(true);
    }

    if (newTodo.title.trim() === '' || newTodo.userId === 0) {
      return;
    }

    setTodos(currentTodo => [
      ...currentTodo,
      {
        ...newTodo,
        id: count,
      },
    ]);
    setCount(currentCount => currentCount + 1);
    setNewTodo(DEFAULT_TODO_VALUE);
  };

  const userById = (userId: number): User | null => {
    return usersFromServer.find(user => user.id === userId) || null;
  };

  const visibleTodos: TodoWithUser[] = todos.map(todo => ({
    ...todo,
    user: userById(todo.userId),
  }));

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="inputTitle">Title: </label>
          <input
            id="inputTitle"
            type="text"
            data-cy="titleInput"
            value={newTodo.title}
            onChange={handleTitleChange}
            placeholder="Enter a title"
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="selectUser">User: </label>
          <select
            id="selectUser"
            data-cy="userSelect"
            value={newTodo.userId}
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
      <TodoList todos={visibleTodos} />
    </div>
  );
};
