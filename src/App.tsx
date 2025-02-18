import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { User } from './Types/User';
import { Todo } from './Types/Todo';

import './App.scss';

const findUser = (userId: number, users: User[]) => {
  return users.find(person => person.id === userId) || null;
};

const addUsers = (todos: Todo[], users: User[]) => {
  return todos.map(todo => {
    const user = findUser(todo.userId, users);

    return {
      ...todo,
      user,
    };
  });
};

const todosWithUsers = addUsers(todosFromServer, usersFromServer);

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [todos, setTodos] = useState(todosWithUsers);
  const [hasError, setHasError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title || !userId) {
      setHasError(true);

      return;
    }

    const user = findUser(userId, usersFromServer);
    const newId = Math.max(...todos.map(person => person.id)) + 1;

    const newTodo = {
      title,
      user,
      userId,
      id: newId,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setHasError(false);
    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">
            {`Title: `}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              id="title"
              value={title}
              onChange={event => setTitle(event.target.value)}
            />
          </label>

          {hasError && !title && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user-select">
            {`User: `}
            <select
              data-cy="userSelect"
              id="user-select"
              value={userId}
              onChange={event => setUserId(+event.target.value)}
              required
            >
              <option value="0" disabled={!!userId}>
                Choose a user
              </option>

              {usersFromServer.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {hasError && !userId && (
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
