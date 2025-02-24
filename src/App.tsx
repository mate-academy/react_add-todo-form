import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';

export function getUserById(userid: number): {
  id: number;
  name: string;
  username: string;
  email: string;
} {
  return usersFromServer.find(x => x.id === userid)!;
}

export const todoList = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const users = usersFromServer.map(u => ({
  userId: u.id,
  name: u.name,
}));

export const App = () => {
  const [todo, setTodo] = useState(todoList);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [showTitleError, setShowTitleError] = useState(false);
  const [showUserError, setShowUserError] = useState(false);

  const maxId = todo.reduce((max, todoi) => Math.max(max, todoi.id), 0);

  const AddTodo = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) {
      setShowTitleError(true);
    }

    if (!userId) {
      setShowUserError(true);
    }

    if (title && userId) {
      const todoNew = {
        id: maxId + 1,
        title: title,
        completed: false,
        userId: userId,
        user: getUserById(userId),
      };
      const resetTodo = [...todo];

      resetTodo.push(todoNew);
      setTodo(resetTodo);
      setTitle('');
      setUserId(0);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={AddTodo} noValidate>
        <div className="field">
          <label>
            Title:
            <input
              type="text"
              placeholder="Enter a title"
              data-cy="titleInput"
              value={title}
              onChange={event => {
                const newTitle = event.target.value.trim();

                setTitle(newTitle);
                if (newTitle) {
                  setShowTitleError(false);
                }
              }}
            />
            {showTitleError ? (
              <span className="error">Please enter a title</span>
            ) : (
              ''
            )}
          </label>
        </div>

        <div className="field">
          <label>
            User:
            <select
              data-cy="userSelect"
              value={userId}
              onChange={event => {
                const newUserId = +event.target.value;

                setUserId(newUserId);
                if (newUserId) {
                  setShowUserError(false);
                }
              }}
            >
              <option value="0" disabled>
                Choose a user
              </option>
              {users.map(user => (
                <option key={user.userId} value={user.userId}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {showUserError ? (
            <span className="error">Please choose a user</span>
          ) : (
            ''
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todo} />
    </div>
  );
};
