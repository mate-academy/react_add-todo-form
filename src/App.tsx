import { useState } from 'react';
import type { FormEvent } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';

type User = (typeof usersFromServer)[number];

type Todo = (typeof todosFromServer)[number] & {
  user: User | null;
};

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId) || null,
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedTitle = title.trim();
    const selectedUser = usersFromServer.find(user => user.id === userId);

    setHasTitleError(normalizedTitle.length === 0);
    setHasUserError(!selectedUser);

    if (!normalizedTitle || !selectedUser) {
      return;
    }

    setTodos(currentTodos => {
      const newId =
        currentTodos.reduce((maxId, todo) => Math.max(maxId, todo.id), 0) + 1;

      const newTodo: Todo = {
        id: newId,
        title: normalizedTitle,
        userId: selectedUser.id,
        completed: false,
        user: selectedUser,
      };

      return [...currentTodos, newTodo];
    });

    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="todo-title">Title: </label>

          <input
            type="text"
            id="todo-title"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setHasTitleError(false);
            }}
          />

          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="todo-user">User: </label>

          <select
            id="todo-user"
            data-cy="userSelect"
            value={userId}
            onChange={event => {
              setUserId(Number(event.target.value));
              setHasUserError(false);
            }}
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

          {hasUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
