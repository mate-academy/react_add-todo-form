import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import type { User, TodoWithUser } from './types';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

const initialTodos: TodoWithUser[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(initialTodos);

  const [title, setTitle] = useState('');
  const [hasTitleEror, setHasTitleEror] = useState(false);

  const [hasChoseEror, setHasChoseEror] = useState(false);
  const [userId, setUserId] = useState(0);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleEror(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasChoseEror(false);
  };

  const addPost = (newTodo: TodoWithUser) => {
    setTodos(currentPosts => [...currentPosts, newTodo]);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newId = Math.max(0, ...todos.map(todo => todo.id)) + 1;

    const cleanTitle = title.trim();

    setHasTitleEror(cleanTitle === '');
    setHasChoseEror(userId === 0);

    if (cleanTitle === '' || userId === 0) {
      return;
    }

    const newTodo: TodoWithUser = {
      id: newId,
      title: cleanTitle,
      userId,
      completed: false,
      user: getUserById(userId),
    };

    addPost(newTodo);

    setTitle('');
    setUserId(0);
    setHasTitleEror(false);
    setHasChoseEror(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="text input"
            value={title}
            onChange={handleTitleChange}
          />

          {hasTitleEror && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasChoseEror && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
