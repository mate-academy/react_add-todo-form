import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

const getUser = (id: number): User | null => {
  return usersFromServer.find(user => user.id === id) || null;
};

const todoList: Todo[] = todosFromServer.map(todo => (
  {
    ...todo,
    user: getUser(todo.userId),
  }
));

const getTodoId = (todos: Todo[]): number => {
  return Math.max(...todos.map(todo => todo.id)) + 1;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState(todoList);
  const [userError, showUserError] = useState(false);
  const [titleError, showTitleError] = useState(false);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    showTitleError(false);
  };

  const handleUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
    showUserError(false);
  };

  const clear = () => {
    showUserError(false);
    showTitleError(false);
    setTitle('');
    setUserId(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!userId) {
      showUserError(true);
    }

    if (!title.trim()) {
      showTitleError(true);
    }

    if (userId && title.trim()) {
      const newTodo: Todo = {
        id: getTodoId(todos),
        title,
        completed: false,
        userId,
        user: getUser(userId),
      };

      setTodos(state => [...state, newTodo]);
      clear();
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
            data-cy="titleInput"
            id="title"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitle}
          />

          {titleError
            && (
              <span className="error">Please enter a title</span>
            )}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            data-cy="userSelect"
            id="user"
            value={userId}
            onChange={handleUser}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map((user) => {
              const { id, name } = user;

              return (
                <option value={id} key={id}>
                  {name}
                </option>
              );
            })}
          </select>

          {userError
            && (
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
