import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo, User } from './types/types';
import { getUserById } from './services/services';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(
    todosFromServer.map(todo => ({
      ...todo,
      user: getUserById(todo.userId),
    })),
  );
  const users: User[] = usersFromServer;

  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [userIdError, setUserIdError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isTitleValid = title.trim().length > 0;
    const isUserValid = userId !== 0;

    setTitleError(!isTitleValid);
    setUserIdError(!isUserValid);

    if (!isTitleValid || !isUserValid) {
      return;
    }

    const user = getUserById(userId);

    if (!user) {
      return;
    }

    const newTodo: Todo = {
      id: Math.max(...todos.map(todo => todo.id)) + 1,
      title: title.trim(),
      userId,
      completed: false,
      user,
    };

    setTodos([...todos, newTodo]);

    setTitle('');
    setUserId(0);
    setTitleError(false);
    setUserIdError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title</label>
          <input
            value={title}
            onChange={e => {
              setTitle(e.target.value);
              setTitleError(false);
            }}
            type="text"
            data-cy="titleInput"
            id="title"
            placeholder="Enter a title"
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user-select">User</label>
          <select
            data-cy="userSelect"
            id="user-select"
            value={userId}
            onChange={e => {
              setUserId(Number(e.target.value));
              setUserIdError(false);
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {users.map(user => (
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

      <TodoList todos={todos} />
    </div>
  );
};
