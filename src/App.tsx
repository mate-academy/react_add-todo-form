import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { TodoWithUser } from './types/TodoWithUser';

const getUserById = (userId: number) => {
  return usersFromServer.find(user => user.id === userId) || null;
};

const getTodoId = (todos: TodoWithUser[]) => {
  const maxTodoId = Math.max(...todos.map(todo => todo.id));

  return maxTodoId + 1;
};

const todosWithUsers: TodoWithUser[] = todosFromServer.map(todo => (
  {
    ...todo,
    user: getUserById(todo.userId),
  }
));

export const App = () => {
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState<TodoWithUser[]>(todosWithUsers);
  const [hasUserIdError, setUserIdError] = useState(false);
  const [hasTitleError, setTitleError] = useState(false);

  const resetForm = () => {
    setTitle('');
    setUserId(0);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserIdError(false);
    setUserId(+event.target.value);
  };

  const handleInput = (event : React.ChangeEvent<HTMLInputElement>) => {
    setTitleError(false);
    setTitle(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimTitle = title.trim();

    setUserIdError(!userId);
    setTitleError(!trimTitle);

    if (!trimTitle || !userId) {
      return;
    }

    const newTodo: TodoWithUser = {
      id: getTodoId(todos),
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);

    resetForm();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleFormSubmit}
      >
        <div className="field">
          <label htmlFor="titleInput">Title: </label>

          <input
            id="titleInput"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleInput}
          />

          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>

          <select
            id="userSelect"
            data-cy="userSelect"
            value={userId}
            onChange={handleSelect}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

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
