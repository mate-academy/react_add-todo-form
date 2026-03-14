import './App.scss';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';

function getUserById(userId: number): User | undefined {
  return usersFromServer.find(user => user.id === userId);
}

const todos: Todo[] = todosFromServer.map(todo => {
  return {
    ...todo,
    user: getUserById(todo.userId),
  };
});

export const App = () => {
  const [storedTodos, setStoredTodos] = useState(todos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasUserError, setHasUserError] = useState(false);
  const [hasTitleError, setHasTitleError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    let isError = false;

    if (userId === 0) {
      isError = true;
      setHasUserError(true);
    }

    if (!title.trim()) {
      isError = true;
      setHasTitleError(true);
    }

    if (isError) {
      return;
    }

    const largestId =
      storedTodos.length > 0
        ? Math.max(...storedTodos.map(todo => todo.id))
        : 0;

    const newTodo: Todo = {
      completed: false,
      id: largestId + 1,
      title: title,
      userId: userId,
      user: getUserById(userId),
    };

    setStoredTodos(currentTodos => [...currentTodos, newTodo]);
    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="titleInput">Enter a title of Todo</label>
          <input
            id="titleInput"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={e => {
              setHasTitleError(false);
              const sanitizedValue = e.target.value.replace(
                /[^a-zA-ZА-ЩЬЮЯЄІЇҐа-щьюяєіїґ0-9 ]/g,
                '',
              );

              setTitle(sanitizedValue);
            }}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">Choose a user</label>
          <select
            id="userSelect"
            data-cy="userSelect"
            value={userId}
            onChange={event => {
              setHasUserError(false);
              setUserId(Number(event.target.value));
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

      <TodoList todos={storedTodos} />
    </div>
  );
};
