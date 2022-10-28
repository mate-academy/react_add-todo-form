import React, { useState } from 'react';
import './App.scss';

import { TodoWithUser } from './types/TodoWithUser';
import { TodoList } from './components/TodoList';
import { User } from './types/User';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const getUserById = (userId: number): User | null => {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
};

const todosWithUsers: TodoWithUser[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoWithUser[]>(todosWithUsers);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const handleNewTodoTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setNewTodoTitle(value);
    setHasTitleError(false);
  };

  const handleUserSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setSelectedUserId(+value);
    setHasUserError(false);
  };

  const resetForm = () => {
    setNewTodoTitle('');
    setSelectedUserId(0);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimTitle = newTodoTitle.trim();

    setHasTitleError(!trimTitle);
    setHasUserError(!selectedUserId);

    const user = getUserById(selectedUserId);
    const id = Math.max(...todos.map(todo => todo.id + 1));

    const newTodo: TodoWithUser = {
      id,
      user,
      title: newTodoTitle,
      completed: false,
      userId: selectedUserId,
    };

    if (trimTitle && selectedUserId) {
      setTodos((currentTodos) => [...currentTodos, newTodo]);
      resetForm();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST" onSubmit={handleFormSubmit}>
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={newTodoTitle}
              onChange={handleNewTodoTitle}
            />

            {hasTitleError && (
              <span className="error">Please enter a title</span>
            )}
          </label>
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={selectedUserId}
              onChange={handleUserSelection}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>

            {hasUserError && (
              <span className="error">Please choose a user</span>
            )}
          </label>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
