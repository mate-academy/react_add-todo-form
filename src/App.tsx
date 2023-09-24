import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

const todoWithUsers = todosFromServer.map((todo) => {
  const user = usersFromServer.find(
    (currentUser) => currentUser.id === todo.userId,
  ) || null;

  return { user, ...todo };
});

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todoWithUsers);

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserError, setHasUserError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserError(false);
  };

  const addTodo = (newTodo: Todo) => {
    setTodos((currentTodos) => [
      ...currentTodos,
      newTodo,
    ]);
  };

  const getId = () => {
    const maxId = Math.max(...todos.map(todo => todo.id));

    return maxId + 1;
  };

  const reset = () => {
    setTitle('');
    setUserId(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const titleIsValid = title.trim().length > 0;
    const userIsValid = userId !== 0;

    setHasTitleError(!titleIsValid);
    setHasUserError(!userIsValid);

    if (!titleIsValid || !userIsValid) {
      return;
    }

    addTodo({
      user: usersFromServer.find(currentUser => currentUser.id === userId),
      id: getId(),
      title,
      completed: false,
      userId,
    });

    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label className="label" htmlFor="title">
            Title:
          </label>

          <input
            id="title"
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder="Enter a title"
            onChange={handleTitleChange}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label
            className="label"
            htmlFor="user"
          >
            User:
          </label>

          <select
            id="user"
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
            required
          >
            <option value="0">
              Choose a user
            </option>
            {usersFromServer.map((user) => (
              <option value={user.id}>{user.name}</option>
            ))}
          </select>

          {hasUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton" onSubmit={handleSubmit}>
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
