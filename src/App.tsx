import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { useState } from 'react';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

const getUserById = (userId: number) => {
  return usersFromServer.find(user => userId === user.id);
};

const preparedTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(preparedTodos);

  const [title, setTitle] = useState('');
  const [hasTitleError, setIsTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserError, setIsUserError] = useState(false);

  const maxId = () => {
    return Math.max(...todos.map(todo => todo.id)) + 1;
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setIsUserError(false);
  };

  const onSubmit = (newTodo: Todo) => {
    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setIsTitleError(!title);
    setIsUserError(!userId);

    if (!title || !userId) {
      return;
    }

    onSubmit({
      id: maxId(),
      title,
      userId,
      completed: false,
      user: getUserById(userId),
    });

    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            type="text"
            id="titleInput"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />

          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            id="userSelect"
            data-cy="userSelect"
            defaultValue="0"
            value={userId}
            onChange={handleUserChange}
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
