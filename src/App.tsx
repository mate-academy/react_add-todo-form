import './App.scss';

import React, { useState } from 'react';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');

  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setTitleError(!title.trim());
    setUserError(!userId);

    if (!title.trim() || !userId) {
      return;
    }

    const selectedUser = usersFromServer.find(user => user.id === userId);

    if (!selectedUser) {
      return;
    }

    const newTodo: Todo = {
      id: todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1,
      title,
      completed: false,
      userId: userId,
      user: selectedUser,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">
            Title:
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleTitleChange}
            />
          </label>

          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label className="label">
            User:
            <select
              data-cy="userSelect"
              value={userId}
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
