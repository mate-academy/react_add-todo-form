import React, { useState } from 'react';

import { Todo } from './types/Todo';
import { User } from './types/User';

import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import './App.scss';

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId)
    || null;
}

const todosWithUsers: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(todosWithUsers);

  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [hasTitleError, setTitleError] = useState(false);

  const [selectedUserId, setSelectedUserId] = useState(0);
  const [hasUserIdError, setUserIdError] = useState(false);

  const addTodo = (title: string, userId: number) => {
    const maxId = Math.max(...todos.map(todo => todo.id)) + 1;
    const newTodo = {
      id: maxId,
      title,
      completed: false,
      userId: selectedUserId,
      user: getUserById(userId),
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setTitleError(!newTodoTitle);
    setUserIdError(!selectedUserId);

    if (!newTodoTitle || !selectedUserId) {
      return;
    }

    addTodo(newTodoTitle, selectedUserId);

    setNewTodoTitle('');
    setSelectedUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleFormSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={newTodoTitle}
            onChange={(event) => {
              setTitleError(false);
              setNewTodoTitle(event.target.value);
            }}
            placeholder="Enter a title"
          />

          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            value={selectedUserId}
            onChange={(event) => {
              setUserIdError(false);
              setSelectedUserId(+event.target.value);
            }}
            data-cy="userSelect"
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasUserIdError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
