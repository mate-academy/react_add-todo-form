import './App.scss';

import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { ToDoWithUser } from './types';
import { TodoList } from './components/TodoList';

const preparedToDos: ToDoWithUser[] = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(({ id }) => id === todo.userId) || null,
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserIdError, setHasUserIdError] = useState(false);
  const [todos, setTodos] = useState<ToDoWithUser[]>(preparedToDos);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const resetForm = () => {
    setTitle('');
    setUserId(0);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  function handleOnAdd(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title && !userId) {
      setHasTitleError(true);
      setHasUserIdError(true);

      return;
    }

    if (!title) {
      setHasTitleError(true);

      return;
    }

    if (!userId) {
      setHasUserIdError(true);

      return;
    }

    const user = usersFromServer.find(({ id }) => id === userId) || null;

    const todosIds = todos.map(({ id }) => id);
    const maxTodoId = Math.max(...todosIds);

    const newTodo = {
      id: maxTodoId + 1,
      title,
      userId,
      completed: false,
      user,
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);

    resetForm();
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleOnAdd}>
        <div className="field">
          <label htmlFor="title-input">Title:&nbsp;</label>
          <input
            id="title-input"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />

          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}

        </div>

        <div className="field">
          <label htmlFor="user-id">User:&nbsp;</label>
          <select
            id="user-id"
            data-cy="userSelect"
            value={userId}
            onChange={handleUserIdChange}
          >
            <option value={0}>Choose a user</option>

            {usersFromServer.map((user) => (
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
