import './App.scss';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const findUserById = (id: number) => {
  return usersFromServer.find(user => user.id === id) || null;
};

const userNames = usersFromServer
  .map(user => (
    {
      id: user.id,
      name: user.name,
    }
  ));

const todosWithUser: Todo[] = todosFromServer
  .map(todo => (
    {
      ...todo,
      user: findUserById(todo.userId),
    }
  ));

const findLastTodoId = (todos: Todo[]) => {
  return Math.max(...todos.map(todo => todo.id));
};

export const App = () => {
  const [todos, setTodos] = useState(todosWithUser);
  const [title, setTitle] = useState('');
  const [showTitleError, setShowTitleError] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [showUserError, setShowUserError] = useState(false);

  const clearForm = () => {
    setTitle('');
    setSelectedUserId('');
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setShowTitleError(false);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(event.target.value);
    setShowUserError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedTitle = title.trim();

    setShowTitleError(!trimmedTitle);
    setShowUserError(!selectedUserId);

    if (trimmedTitle && selectedUserId) {
      clearForm();

      setTodos(currentTodos => {
        const maxTodoId = findLastTodoId(currentTodos);

        return [
          ...currentTodos,
          {
            id: maxTodoId + 1,
            title: trimmedTitle,
            completed: false,
            userId: +selectedUserId,
            user: findUserById(+selectedUserId),
          },
        ];
      });
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Enter a title"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
          />
          {showTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            data-cy="userSelect"
            name="selectedUserId"
            id="user"
            value={selectedUserId}
            onChange={handleSelectChange}
          >
            <option value="" disabled>Choose a user</option>
            {userNames.map(user => (
              <option value={user.id} key={user.id}>
                { user.name }
              </option>
            ))}
          </select>

          {showUserError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
