import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './components/Types/Todo';
import { User } from './components/Types/User';

export const findUserById = (userId: number): User | null => {
  const foundUserById = usersFromServer.find(user => user.id === userId);

  return foundUserById || null;
};

export const allTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: findUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(allTodos);
  const [title, setTitle] = useState('');
  const [hasTitleError, setTitleError] = useState(false);
  const [userSelect, setUserSelect] = useState(0);
  const [hasUserError, setUserError] = useState(false);

  const handleUserSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserSelect(Number(event.target.value));
    setUserError(false);
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleReset = () => {
    setTitle('');
    setUserSelect(0);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTodoId = Math.max(...todos.map(todo => todo.id)) + 1;

    if (!userSelect) {
      setUserError(true);
    }

    if (!title) {
      setTitleError(true);
    }

    if (!title || !userSelect) {
      return;
    }

    const newTodo: Todo = {
      id: newTodoId,
      completed: false,
      user: findUserById(Number(userSelect)),
      title: title.trim(),
      userId: Number(userSelect),
    };

    setTodos([...todos, newTodo]);
    handleReset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="titleInput">
            Title:
          </label>
          <input
            type="text"
            data-cy="titleInput"
            id="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitle}
          />

          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User:</label>
          <select
            data-cy="userSelect"
            id="userSelect"
            value={userSelect}
            onChange={handleUserSelect}
          >
            <option
              value="0"
              disabled
              selected
            >
              Choose a user
            </option>

            {usersFromServer.map(userName => (
              <option key={userName.id} value={userName.id}>
                {userName.name}
              </option>
            ))}
          </select>

          {hasUserError && (
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
