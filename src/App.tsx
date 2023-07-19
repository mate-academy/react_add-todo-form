/* eslint-disable import/no-cycle */
import './App.scss';

import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User | null;
}

function getUserById(userId: number):User | null {
  return usersFromServer.find(user => user.id === userId)
      || null;
}

export const todosWithUser = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosWithUser);
  const [titleName, setTitleName] = useState('');
  const [titleNameError, setTitleNameError] = useState(false);
  const [userId, setUserId] = useState(0);
  const [userIdError, setUserIdError] = useState(false);

  function reset() {
    setTitleName('');
    setUserId(0);
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const nextId = Math.max(...todos.map((todo) => todo.id)) + 1;

    const newTodo: Todo = {
      id: nextId,
      title: titleName,
      completed: false,
      userId,
      user: getUserById(userId),
    };

    if (!titleName) {
      setTitleNameError(true);
    }

    if (!userId) {
      setUserIdError(true);
    }

    if (!titleName || !userId) {
      return;
    }

    setTodos((prevTodos) => [...prevTodos, newTodo]);
    reset();
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
          <input
            type="text"
            data-cy="titleInput"
            value={titleName}
            onChange={event => {
              setTitleName(event.target.value);
              setTitleNameError(false);
            }}
            placeholder="Enter a title"
          />
          {titleNameError
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={event => {
              setUserId(+event.target.value);
              setUserIdError(false);
            }}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
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

      <h1 className="App__title">Static list of todos</h1>
      <TodoList todos={todos} />
    </div>
  );
};
