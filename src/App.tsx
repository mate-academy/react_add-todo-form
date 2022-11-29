import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUserById(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [currentTodos, setCurrentTodos] = useState(todos);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const hasTitle = title.trim() !== '';

  const getNewTodoId = (allTodos: Todo[]) => {
    const largestId = Math.max(...allTodos.map(todo => todo.id));

    return largestId + 1;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (userId !== 0 && hasTitle) {
      const newTodo = {
        id: getNewTodoId(currentTodos),
        userId,
        title,
        completed: false,
        user: getUserById(userId),
      };

      setCurrentTodos(current => ([
        ...current,
        newTodo,
      ]));

      setUserId(0);
      setTitle('');
      setIsSubmitted(false);
    } else {
      setIsSubmitted(true);
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const titleName = event.target.value.replace(/[^a-z-0-9-' ']/gi, '');

    setTitle(titleName);
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
          <label>
            Title:
            <input
              type="text"
              data-cy="titleInput"
              name="title"
              placeholder="Enter a title"
              value={title}
              onChange={handleTitleChange}
            />
          </label>
          {!hasTitle && isSubmitted && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            User:
            <select
              data-cy="userSelect"
              name="userId"
              value={userId}
              onChange={(event) => setUserId(+event.target.value)}
            >
              <option
                value="0"
                disabled
              >
                Choose a user
              </option>
              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>{user.name}</option>
              ))}
            </select>
          </label>

          {!userId && isSubmitted && (
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

      <TodoList todos={currentTodos} />
    </div>
  );
};
