import './App.scss';

import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todos } from './types/Todos';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId)
    || null;
}

export const todosWithUser: Todos[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<Todos[]>(todosWithUser);
  const [title, setTitle] = useState('');
  const [userId, setUserID] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleUserIdChange = (event:
  React.ChangeEvent<HTMLSelectElement>) => {
    setUserID(+event.target.value);
    setUserError(false);
  };

  const addTodo = (newTodo: Todos) => {
    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();

    if (title && userId) {
      addTodo({
        id: Math.max(...todos.map(todo => todo.id)) + 1,
        title,
        completed: false,
        userId,
        user: getUserById(userId),
      });
      setTitle('');
      setUserID(0);
    }

    setTitleError(!title);
    setUserError(!userId);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleAdd}
      >
        <div className="field">
          <label htmlFor="post-title">Title: </label>
          <input
            id="post-title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
          {titleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="post-user-id">User: </label>
          <select
            id="post-user-id"
            data-cy="userSelect"
            required
            value={userId}
            onChange={handleUserIdChange}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {userError && (
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

      <section className="TodoList">
        <TodoList todos={todos} />
      </section>
    </div>
  );
};
