import { useState } from 'react';

import './App.scss';
import { TodoList } from './components/TodoList';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { Todo } from './types/Todo';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setHasTitleError(false);
  };

  const handleUserId = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+e.target.value);
    setHasUserIdError(false);
  };

  function reset() {
    setTitle('');
    setUserId(0);
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    const newTodo = {
      id: Math.max(...todos.map(todo => todo.id)) + 1,
      title: title,
      completed: false,
      userId: userId,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <span>Title: </span>
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitle}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <span>User: </span>
          <select data-cy="userSelect" value={userId} onChange={handleUserId}>
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => (
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
