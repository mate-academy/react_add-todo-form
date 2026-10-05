import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import React, { useState } from 'react';

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId) || null,
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [titleError, setTitleError] = useState(false);
  const [userIdError, setUserIdError] = useState(false);

  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setTitleError(!title.trim());
    setUserIdError(!userId);

    if (!title.trim() || !userId) {
      return;
    }

    const maxId = Math.max(...todos.map(todo => todo.id));

    const newTodo: Todo = {
      id: maxId + 1,
      title: title.trim(),
      userId,
      completed: false,
      user: usersFromServer.find(user => user.id === userId) || null,
    };

    setTodos(current => [...current, newTodo]);
    setTitle('');
    setUserId(0);
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleUserId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserIdError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            placeholder="Enter a title"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitle}
          />

          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            id="user"
            data-cy="userSelect"
            value={userId}
            onChange={handleUserId}
          >
            <option value="0">Choose a user</option>
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
