import React, { useState } from 'react';
import './App.scss';

import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { Todo, Error } from './types';

const getUserById = (userId: number) => {
  return usersFromServer.find(user => user.id === userId) || null;
};

const todosWithUsers = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(todosWithUsers);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);

  const [showTitleError, setShowTitleError] = useState(false);
  const [showUserError, setShowUserError] = useState(false);

  const getIdByMaxArrayValue = todos.length;
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const validTitle = event.target.value.replace(/[^a-zA-Za-яA-Я ]/g, '');

    setNewTodoTitle(validTitle);
  };

  const addNewTodo = (title: string, userId: number, id: number) => {
    const newTodo: Todo = {
      id,
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    };

    setTodos([...todos, newTodo]);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setShowTitleError(!newTodoTitle);
    setShowUserError(!selectedUserId);

    if (newTodoTitle && selectedUserId) {
      addNewTodo(newTodoTitle, selectedUserId, getIdByMaxArrayValue);
    }
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
            placeholder="Enter a title"
            value={newTodoTitle}
            onChange={handleTitleChange}
          />

          {showTitleError
            && !newTodoTitle
              && (
                <span className="error">{Error.TitleAbsence}</span>
              )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={event => setSelectedUserId(Number(event.target.value))}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {showUserError
            && !selectedUserId
              && (
                <span className="error">{Error.UserAbsence}</span>
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
