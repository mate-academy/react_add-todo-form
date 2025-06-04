import './App.scss';

import todosFromServer from './api/todos';
import users from './api/users';
import { TodoList } from './components/TodoList';
import { getUserById } from './services/user';
import { Todo } from './types/Todo';
import { useState } from 'react';
import { User } from './types/User';

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;

    const cleanedValue = rawValue.replace(/[^a-zA-Zа-яА-ЯґҐєЄіІїЇ0-9 ]/g, '');

    setTitle(cleanedValue);
    setHasTitleError(false);
  };

  const handleUserIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+e.target.value);
    setHasUserIdError(false);
  };

  const addTodo = (newTodo: Todo) => {
    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    const maxId = Math.max(...todos.map(todo => todo.id));

    addTodo({
      id: maxId + 1,
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    });

    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <label className="field">
          Title:
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </label>

        <div className="field">
          <label htmlFor="user-id">User:</label>
          <select
            id="user-id"
            data-cy="userSelect"
            required
            value={userId}
            onChange={handleUserIdChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {users.map((user: User) => (
              <option value={user.id} key={user.id}>
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
