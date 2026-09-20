import { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId) || null,
}));

export const App = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const user = usersFromServer.find(person => person.id === Number(userId));

    setHasTitleError(!trimmedTitle);
    setHasUserError(!user);

    if (!trimmedTitle || !user) {
      return;
    }

    setTodos(currentTodos => [
      ...currentTodos,
      {
        id: Math.max(0, ...currentTodos.map(todo => todo.id)) + 1,
        title: trimmedTitle,
        userId: user.id,
        completed: false,
        user,
      },
    ]);
    setTitle('');
    setUserId('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="todo-title">Title: </label>
          <input
            id="todo-title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={event => {
              setTitle(
                event.target.value.replace(/[^a-zа-щьюяєіїґ0-9 ]/gi, ''),
              );
              setHasTitleError(false);
            }}
            aria-invalid={hasTitleError}
            aria-describedby={hasTitleError ? 'title-error' : undefined}
          />
          {hasTitleError && (
            <span id="title-error" className="error">
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <label htmlFor="todo-user">User: </label>
          <select
            id="todo-user"
            data-cy="userSelect"
            value={userId}
            onChange={event => {
              setUserId(event.target.value);
              setHasUserError(false);
            }}
            aria-invalid={hasUserError}
            aria-describedby={hasUserError ? 'user-error' : undefined}
          >
            <option value="" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasUserError && (
            <span id="user-error" className="error">
              Please choose a user
            </span>
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
