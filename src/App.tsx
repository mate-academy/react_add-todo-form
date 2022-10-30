import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { Todo } from './react-app-env';

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
  const [hasError, setHasError] = useState(false);

  const reset = () => {
    setTitle('');
    setTodoUserId(0);
    setHasError(false);
  };

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!todoUserId || !title) {
      setHasError(true);
    } else {
      setTodos(
        [
          ...todos,
          {
            id: getTodoId(todos),
            title,
            completed: false,
            userId: todoUserId,
            user: getUser(todoUserId),
          },
        ],
      );

      reset();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={event => onFormSubmit(event)}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
          {(!title && hasError) && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={todoUserId}
            onChange={event => setTodoUserId(+event.target.value)}
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

          {(hasError && !todoUserId) && (
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
