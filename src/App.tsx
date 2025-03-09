import React, { useState, useMemo } from 'react';

import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User, Todo } from './interfaces';
import { TodoList } from './components/TodoList';

const preparedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(({ id }) => id === todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(preparedTodos);
  const [userId, setUserId] = useState<number>(0);
  const [title, setTitle] = useState<string>('');

  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const users: User[] = useMemo(() => usersFromServer, []);

  const getTodoId = (): number => {
    return Math.max(...todos.map(({ id }) => id)) + 1;
  };

  const chooseUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    if (+event.target.value) {
      setUserError(false);
    }
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    if (event.target.value.trim()) {
      setTitleError(false);
    }
  };

  const reset = () => {
    setUserId(0);
    setTitle('');
    setTitleError(false);
    setUserError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title || !userId) {
      if (!title) {
        setTitleError(true);
      }

      if (!userId) {
        setUserError(true);
      }

      return;
    }

    const newTodo: Todo = {
      id: getTodoId(),
      title,
      completed: false,
      userId,
      user: users.find(({ id }) => id === userId),
    };

    setTodos([...todos, newTodo]);
    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label>
            <span>Title: </span>
            <input
              type="text"
              data-cy="titleInput"
              onChange={handleTitle}
              value={title}
              placeholder="Enter a title"
            />
            {titleError && <span className="error">Please enter a title</span>}
          </label>
        </div>

        <div className="field">
          <label>
            <span>User: </span>
            <select data-cy="userSelect" value={userId} onChange={chooseUser}>
              <option value="0" disabled>
                Choose a user
              </option>
              {users.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
