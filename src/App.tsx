import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { getUserById, initialTodos } from './services/initialTodos';

export const App: React.FC = () => {
  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [todoList, setTodoList] = useState<Todo[]>(initialTodos);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formatedValue = event.target.value
      .replace(/[^A-Za-z0-9А-ЩЬЮЯҐЄІЇа-щьюяґєії\s]/g, '');

    setTitle(formatedValue);
    setHasTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const resetForm = () => {
    setUserId(0);
    setTitle('');
    setHasTitleError(false);
    setHasUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    function newTodoId(listOfTodos: Todo[]) {
      const maxId = Math.max(
        ...listOfTodos.map(todo => todo.id),
      );

      return maxId + 1;
    }

    const newTodo: Todo = {
      id: newTodoId(todoList),
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    };

    setTodoList(currentTodos => [...currentTodos, newTodo]);

    resetForm();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            id="title"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="selectUser">User: </label>
          <select
            id="selectUser"
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
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

      <TodoList
        todos={todoList}
      />

    </div>
  );
};
