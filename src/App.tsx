import { ChangeEvent, FormEvent, useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { FullTodo, Todo } from './types/Todo';
import { User } from './types/User';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const getUser = (todoId: number): User | null => {
  const foundedUser = usersFromServer.find((user) => user.id === todoId);

  return foundedUser || null;
};

const preparedTodos = todosFromServer.map((todo: Todo): FullTodo => ({
  ...todo,
  user: getUser(todo.id) || null,
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);
  const [todos, setTodos] = useState(preparedTodos);

  const handleTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserId = (event: ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const resetForm = () => {
    setTitle('');
    setUserId(0);
  };

  const handleTodos = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserIdError(!userId);

    const id = Math.max(...todos.map((todo) => todo.id)) + 1;

    const todo = {
      id,
      title,
      completed: false,
      userId,
      user: getUser(userId) || null,
    };

    if (title && userId) {
      setTodos((currentTodos) => [...currentTodos, todo]);
      resetForm();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleTodos}
      >
        <div className="field">
          <label>
            {'Title '}

            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleTitle}
            />
          </label>
          {hasTitleError && (
            <span className="error">{' Please enter a title'}</span>
          )}
        </div>

        <div className="field">
          <label>
            {'Title '}

            <select
              data-cy="userSelect"
              value={userId}
              onChange={handleUserId}
            >
              <option value="0" disabled>Choose a user</option>

              {usersFromServer.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          {hasUserIdError && (
            <span className="error">{' Please choose a user'}</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
