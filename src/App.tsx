import React, { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const getTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState(getTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const newTodoId: number = Math.max(
    ...todosFromServer.map(todo => todo.id),
  ) + 1;

  const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!userId) {
      setUserError(true);
    }

    if (!title) {
      setTitleError(true);
    }

    if (!userId || !title) {
      return;
    }

    const newTodo: Todo = {
      id: newTodoId,
      completed: false,
      user: getUser(Number(userId)),
      title: title.trim(),
      userId: Number(userId),
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setUserId(0);
  };

  const changeTitle = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTitleError(false);
    setTitle(event.target.value);
  };

  const changeUser = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setUserError(false);
    setUserId(+event.target.value);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleAddTodo}
      >
        <div className="field">
          <label>
            Title:
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              onChange={changeTitle}
            />
          </label>

          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            User:
            <select
              data-cy="userSelect"
              value={userId}
              onChange={changeUser}
            >
              <option value="0" disabled>
                Choose a user
              </option>
              {usersFromServer.map(user => ((
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              )))}
            </select>
          </label>

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
