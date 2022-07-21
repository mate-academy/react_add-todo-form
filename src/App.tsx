import React, { useEffect, useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User, Todo } from './types';

const getUserInfo = (userId: number): User | null => {
  const getUser = usersFromServer.find(
    user => user.id === userId,
  );

  return getUser || null;
};

export const App = () => {
  const [todos, setTodo] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasTitleError, setTitleError] = useState(false);
  const [hasUserError, setUserError] = useState(false);

  useEffect(() => {
    const setTodos = todosFromServer.map(todo => ({
      ...todo,
      user: getUserInfo(todo.userId),
    }));

    setTodo(setTodos);
  }, []);

  const addTodo = (newTitle: string, newUserId: number): void => {
    const maxId = Math.max(...todos.map(todo => todo.id));

    const newTodo: Todo = {
      title: newTitle,
      userId: newUserId,
      completed: false,
      id: maxId + 1,
      user: getUserInfo(userId),
    };

    setTodo(currentTodos => [...currentTodos, newTodo]);
  };

  const submitHandle = (event: React.FormEvent) => {
    event.preventDefault();

    setTitleError(!title);
    setUserError(!userId);

    if (!title || !userId) {
      return;
    }

    addTodo(title, userId);
    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1 className="App__title">
        Add todo form
      </h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={submitHandle}
        className="form"
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            className="form__field"
            placeholder="New todo"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setTitleError(false);
            }}
          />

          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            className="form__field"
            value={userId}
            onChange={event => {
              setUserId(+event.target.value);
              setUserError(false);
            }}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
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
