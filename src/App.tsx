import './App.scss';
import React, { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function getNewTodoId(todos: Todo[]) {
  const maxId = Math.max(...todos.map(todo => todo.id), 0);

  return maxId + 1;
}

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserError, setHasUserError] = useState(false);

  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserError(false);
  };

  const reset = () => {
    setTitle('');
    setUserId(0);

    setHasTitleError(false);
    setHasUserError(false);
  };

  const addTodo = (newTodo: Todo) => {
    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserError(!userId);

    if (!title.trim() || !userId) {
      return;
    }

    addTodo({
      id: getNewTodoId(todos),
      title,
      user: getUserById(userId),
      userId,
      completed: false,
    });

    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label" htmlFor="todo-title">
            Title:
          </label>
          <input
            id="todo-title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />

          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label className="label" htmlFor="todo-user-id">
            User:
          </label>
          <select
            data-cy="userSelect"
            id="todo-user-id"
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

          {hasUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos} />;
    </div>
  );
};
