import { useState } from 'react';

import './App.scss';

import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User, TodoWithUser } from './types';

const findUser = (userId: number): User | undefined =>
  usersFromServer.find(user => user.id === userId);

const todosWithUsers: TodoWithUser[] = todosFromServer.map(todo => ({
  ...todo,
  user: findUser(todo.userId) || null,
}));

const maxId = (todos: TodoWithUser[]): number => {
  return Math.max(...todos.map(todo => todo.id));
};

const TITLE_DEFAULT_VALUE = '';
const SELECTED_USER_ID_DEFAULT_VALUE = 0;

export const App = () => {
  const [todos, setTodos] = useState<TodoWithUser[]>(todosWithUsers);

  const [selectedUserId, setSelectedUserId] = useState<number>(
    SELECTED_USER_ID_DEFAULT_VALUE,
  );
  const [hasUserIdError, setHasUserIdError] = useState<boolean>(false);

  const [title, setTitle] = useState<string>(TITLE_DEFAULT_VALUE);
  const [hasTitleError, setHasTitleError] = useState<boolean>(false);

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const clearForm = () => {
    setTitle(TITLE_DEFAULT_VALUE);
    setSelectedUserId(SELECTED_USER_ID_DEFAULT_VALUE);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserIdError(!selectedUserId);

    if (!title || !selectedUserId) {
      return;
    }

    setTodos([
      ...todos,
      {
        id: maxId(todos) + 1,
        title,
        completed: false,
        userId: selectedUserId,
        user: findUser(selectedUserId) || null,
      },
    ]);

    clearForm();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
            placeholder="Title"
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUserId}
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
