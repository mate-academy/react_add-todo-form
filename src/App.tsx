import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { Todos } from './types/Todos';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App = () => {
  const [todos, setTodos] = useState<Todos[]>(todosFromServer);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
    setHasTitleError(false);
  }

  function handleUserIdChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setUserId(Number(event.target.value));
    setHasUserError(false);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const isTitleValid = title.trim().length > 0;
    const isUserValid = userId !== 0;

    if (!isTitleValid || !isUserValid) {
      setHasTitleError(!isTitleValid);
      setHasUserError(!isUserValid);
      return;
    }

    const maxId = todos.reduce((max, todo) => Math.max(max, todo.id), 0);

    const newTodo: Todos = {
      id: maxId + 1,
      title: title.trim(),
      completed: false,
      userId,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);

    setTitle('');
    setUserId(0);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Title"
            value={title}
            onChange={handleTitleChange}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            value={userId}
            data-cy="userSelect"
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

          {hasUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} users={usersFromServer} />
    </div>
  );
};
