import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './components/types/User';
import React, { useState } from 'react';
import { Todo } from './components/types/Todo';
import { TodoList } from './components/TodoList';

const getUserById = (userId: number): User | null => {
  return usersFromServer.find(user => user.id === userId) || null;
};

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

const newIdTodo = (todos: Todo[]): number => {
  return todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
};

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const resetForm = () => {
    setTitle('');
    setUserId(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title.trim());
    setHasUserIdError(!userId);

    if (!title.trim() || !userId) {
      return;
    }

    const newTodo = {
      id: newIdTodo(todos),
      title: title.trim(),
      completed: false,
      userId: userId,
      user: getUserById(userId),
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
    resetForm();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label>
            Title:
            <input
              type="text"
              value={title}
              placeholder="Enter a title"
              data-cy="titleInput"
              onChange={handleTitleChange}
            />
          </label>

          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            User:
            <select
              data-cy="userSelect"
              value={userId}
              onChange={handleUserIdChange}
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
          {hasUserIdError && (
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
