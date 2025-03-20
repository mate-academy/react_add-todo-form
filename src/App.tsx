import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';

export type Todo = {
  user: {
    id: number;
    name: string;
    username: string;
    email: string;
  } | null;
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const App: React.FC = () => {
  const todos = todosFromServer.map(todo => ({
    ...todo,
    user: getUserById(todo.userId),
  }));

  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState(0);
  const [hasError, setHasError] = useState({ title: false, user: false });
  const [newList, setNewList] = useState(todos);

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(+event.target.value);
    setHasError({ ...hasError, user: false });
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filteredTitle = event.target.value.replace(
      /[^a-zA-Zа-яА-ЯёЁїЇєЄіІ0-9 ]/g,
      '',
    );

    setTitle(filteredTitle);
    setHasError({ ...hasError, title: false });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newErrorState = {
      title: !title,
      user: selectedUser === 0,
    };

    setHasError(newErrorState);

    if (newErrorState.title || newErrorState.user) {
      return;
    }

    const newId = Math.max(...todos.map(todo => todo.id)) + 1;

    const newTodo: Todo = {
      id: newId,
      title,
      userId: selectedUser,
      completed: false,
      user: getUserById(selectedUser),
    };

    setNewList(current => [...current, newTodo]);
    setTitle('');
    setSelectedUser(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label" htmlFor="post-title">
            {`Title: `}
          </label>

          <input
            id="post-title"
            type="text"
            placeholder="Enter a title"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
          />
          {hasError.title && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label className="label" htmlFor="post-select">
            {`User: `}
          </label>
          <select
            id="post-select"
            data-cy="userSelect"
            value={selectedUser}
            onChange={handleUserChange}
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
          {hasError.user && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={newList} />
    </div>
  );
};
