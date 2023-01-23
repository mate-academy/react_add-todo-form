import React, { useState } from 'react';
import './App.scss';

import { User } from './types/User';
import { Todo } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId)
  || null;
}

const todosWithUsers: Todo[] = todosFromServer.map(todo => ({
  ...todo, user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(todosWithUsers);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const addTodo = (title: string, userId: number) => {
    const maxId = Math.max(...todosWithUsers.map(todo => todo.id));
    const newTodo = {
      id: maxId + 1,
      title,
      userId,
      completed: false,
      user: getUserById(userId),
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!newTodoTitle);
    setHasUserError(!selectedUserId);

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

      <form onSubmit={handleFormSubmit}>
        <div className="field">
          <label>
            Title:
            <input
              type="text"
              data-cy="titleInput"
              value={newTodoTitle}
              placeholder="Please add title"
              onChange={(event) => {
                setHasTitleError(false);
                setNewTodoTitle(event.target.value);
              }}
            />
            {hasTitleError && (
              <span className="error">Please enter a title</span>
            )}
          </label>
        </div>

        <div className="field">
          <label>
            User:
            <select
              data-cy="userSelect"
              value={selectedUserId}
              onChange={(event) => {
                setHasUserError(false);
                setSelectedUserId(+event.target.value);
              }}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map((user) => (
                <option
                  value={user.id}
                  key={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          {hasUserError && (
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
