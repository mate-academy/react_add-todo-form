import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { getUserById } from './services/userService';

type Props = {
  onSubmit: (todos: Todo) => void;
};

export const initialTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC<Props> = () => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userValue, setUserValue] = useState(0);
  const [hasUserError, setHasUserError] = useState(false);

  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const addTodo = (newTodo: Todo) => {
    const todoToAdd: Todo = {
      ...newTodo,
      id: Math.max(...todos.map(todo => todo.id)) + 1,
    };

    setTodos(currentTodos => [...currentTodos, todoToAdd]);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserValue(+event.target.value);
    setHasUserError(false);
  };

  const reset = () => {
    setTitle('');
    setUserValue(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setHasTitleError(!title.trim());
    setHasUserError(!userValue);

    if (!title.trim() || !userValue) {
      return;
    }

    const newTodo = {
      title,
      userValue,
      completed: false,
      user: getUserById(userValue),
      id: Math.max(...todos.map(todo => todo.id)) + 1,
      userId: userValue,
    };

    addTodo(newTodo);

    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit} action="/api/todos" method="POST">
        <div className="field">
          <label htmlFor="titleInput">Title:&nbsp;&nbsp;</label>
          <input
            type="text"
            data-cy="titleInput"
            onChange={handleTitleChange}
            id="titleInput"
            value={title}
            placeholder="Enter a title"
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User:&nbsp;</label>
          <select
            value={userValue}
            onChange={handleUserChange}
            data-cy="userSelect"
            id="userSelect"
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
