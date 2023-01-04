import React, { useState } from 'react';

import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';

import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [currentTodos, setCurrentTodos] = useState(todos);
  const [isUserSelected, setIsUserSelected] = useState(true);
  const [isTitleEntered, setIsTitleEntered] = useState(true);

  const newId = Math.max(...currentTodos.map(todo => todo.id)) + 1;

  function addTodo(id: number) {
    if (getUser(id) && title.trim()) {
      const newTodo = {
        id: newId,
        userId: id,
        title,
        completed: false,
        user: getUser(userId),
      };

      setUserId(0);
      setTitle('');
      setCurrentTodos([...currentTodos, newTodo]);
    }

    if (!userId) {
      setUserId(0);
      setIsUserSelected(false);
    }

    if (!title.trim()) {
      setIsTitleEntered(false);
    }
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
    setIsTitleEntered(true);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.currentTarget.value);
    setIsUserSelected(true);
  };

  function handleFormSubmit(event1: React.FormEvent<HTMLFormElement>) {
    event1.preventDefault();
    addTodo(userId);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleFormSubmit}
      >
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            name="titleInput"
            id="titleInput"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter a title"
          />

          {!isTitleEntered && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            data-cy="userSelect"
            id="userSelect"
            name="userSelect"
            value={userId}
            onChange={handleUserChange}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {!isUserSelected && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={currentTodos} />
    </div>
  );
};
