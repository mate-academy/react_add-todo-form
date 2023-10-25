// #region imports
import { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { getTodoId, getUserById } from './services/user';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
// #endregion

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const [title, setTitle] = useState('');
  const [hasNoTitleError, setHasNoTitleError] = useState(true);

  const [userId, setUserId] = useState(0);
  const [hasNoUserIdError, setHasNoUserIdError] = useState(true);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasNoTitleError(true);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasNoUserIdError(true);
  };

  const addTodo = (event: React.FormEvent) => {
    const hasNoError = !!title && !!userId;

    event.preventDefault();
    setHasNoTitleError(!!title);
    setHasNoUserIdError(!!userId);

    if (hasNoError) {
      setTodos((currentTodos) => [...currentTodos, {
        id: getTodoId(currentTodos),
        title,
        completed: false,
        userId,
        user: getUserById(userId),
      }]);

      setTitle('');
      setUserId(0);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={addTodo}
      >
        <div className="field">
          <input
            type="text"
            value={title}
            data-cy="titleInput"
            pattern="^[a-zA-Z0-9\sА-Яа-яіІєЄїЇґҐ  ]*$"
            placeholder="Please enter a title"
            onChange={handleTitleChange}
          />
          {!hasNoTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUserIdChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {!hasNoUserIdError && (
            <span className="error">Please choose a user</span>
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
