import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const getTodoId = (todos: Todo[]) => {
  const id = Math.max(...todos.map(todo => todo.id));

  return id + 1;
};

const getUser = (userId: number) => (
  usersFromServer.find(user => user.id === userId) || null
);

const todosAndUsers: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(todosAndUsers);
  const [title, setTitle] = useState('');
  const [todoUserId, setTodoUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const reset = () => {
    setTitle('');
    setTodoUserId(0);
    setHasTitleError(false);
    setHasUserError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!todoUserId || !title.trim()) {
      if (!title.trim()) {
        setHasTitleError(true);
      }

      if (todoUserId === 0) {
        setHasUserError(true);
      }

      return;
    }

    const todo = {
      id: getTodoId(todos),
      title,
      completed: false,
      userId: todoUserId,
      user: getUser(todoUserId),
    };

    setTodos(prevTodos => [...prevTodos, todo]);
    reset();
  };

  const handleOnInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (hasTitleError) {
      setHasTitleError(false);
    }

    setTitle(event.target.value.replace(/[^a-zа-я0-9\s]/gi, ''));
  };

  const handleOnSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (hasUserError) {
      setHasUserError(false);
    }

    setTodoUserId(+event.target.value);
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
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleOnInput}
          />
          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={todoUserId}
            onChange={handleOnSelect}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => {
              const { id, name } = user;

              return (
                <option value={id} key={id}>
                  {name}
                </option>
              );
            })}
          </select>

          {hasUserError && (
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
