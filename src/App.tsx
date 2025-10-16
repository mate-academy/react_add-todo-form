import React, { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { UsersAndTodos } from './types/UsersAndTodos';
import { TodoList } from './components/TodoList';

const users = usersFromServer;
const todos = todosFromServer;

const todosWithUsers: UsersAndTodos[] = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId)!,
}));

export const App = () => {
  const [todosState, setTodosState] = useState<UsersAndTodos[]>(todosWithUsers);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let valid = true;

    if (title.trim() === '') {
      setTitleError('Please enter a title');
      valid = false;
    }

    if (!userId || userId === 0) {
      setUserError('Please choose a user');
      valid = false;
    }

    if (!valid) {
      return;
    }

    const newTodo = {
      id: Math.max(...todosState.map(todo => todo.id)) + 1,
      title,
      completed: false,
      userId,
      user: users.find(user => user.id === userId)!,
    };

    setTodosState(prev => [...prev, newTodo]);
    setTitle('');
    setUserId(0);
    setTitleError('');
    setUserError('');
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const clean = event.target.value.replace(/[^a-zA-Z0-9 ]/g, '');

    setTitle(clean);
    setTitleError('');
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
    setUserError('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title</label>
          <input
            id="titleInput"
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder="Enter a title"
            onChange={handleTitleChange}
          />
          {titleError && <span className="error">{titleError}</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User</label>
          <select
            id="userSelect"
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {userError && <span className="error">{userError}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todosState} />
    </div>
  );
};
