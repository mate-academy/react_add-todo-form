import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import React, { useEffect, useState } from 'react';
import { TodoList } from './components/TodoList';
import { NewTodo } from './types/Todo';

export const App = () => {
  const [userId, setUserId] = useState<number>(0);
  const [title, setTitle] = useState<string>('');
  const [todos, setTodos] = useState<NewTodo[]>([]);

  const [titleError, setTitleError] = useState(false);
  const [userIdError, setUserIdError] = useState(false);

  useEffect(() => {
    const todosWithUsers = todosFromServer.map(todo => {
      return {
        ...todo,
        user: usersFromServer.find(user => user.id === todo.userId),
      };
    });

    setTodos(todosWithUsers);
  }, []);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const regexp = /[^A-Za-z0-9а-яА-я ]+/g;
    const rawValue = event.target.value;

    if (!regexp.test(rawValue)) {
      setTitle(event.target.value);
    }

    if (event.target.value) {
      setTitleError(false);
    } else {
      setTitleError(true);
    }
  };

  const submit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title || !title.trim()) {
      setTitleError(true);

      return;
    }

    if (userId === 0) {
      setUserIdError(true);

      return;
    }

    setTodos(prevTodos => {
      return [
        ...prevTodos,
        {
          id: Math.max(...todos.map(todo => todo.id)) + 1,
          title: title,
          completed: false,
          userId: userId,
          user: usersFromServer.find(user => user.id === userId),
        },
      ];
    });

    setTitle('');
    setUserId(0);
    setTitleError(false);
    setUserIdError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={submit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder="Please enter a title"
            onChange={handleTitleChange}
          />

          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={e => setUserId(+e.target.value)}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {userIdError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
