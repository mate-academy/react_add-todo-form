import { useState } from 'react';
import { TodoList } from './components/TodoList';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';

function getUserById(userId:number) {
  return usersFromServer.find(user => user.id === userId);
}

export const todosList: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId) || null,
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasTitleError, sethasTitleError] = useState(false);
  const [hasUserIdError, sethasUserIdError] = useState(false);
  const [todos, setTodos] = useState<Todo[]>(todosList);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    sethasTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    sethasUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    sethasTitleError(!title);
    sethasUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    if (title && userId) {
      const newTodo:Todo = {
        id: Math.max(...todos.map(todo => todo.id)) + 1,
        title,
        completed: false,
        userId,
        user: getUserById(userId) || null,
      };

      setTodos(currentTodos => [...currentTodos, newTodo]);

      setTitle('');
      sethasTitleError(false);
      setUserId(0);
      sethasUserIdError(false);
    }
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
          <label htmlFor="post-title" className="label">Title: </label>

          <input
            type="text"
            data-cy="titleInput"
            onChange={handleTitleChange}
            value={title}
            id="post-title"
          />

          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="post-user">User: </label>

          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUserIdChange}
            id="post-user"
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map((user) => (
              <option key={user.id} value={user.id}>
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

      <section className="TodoList">
        <TodoList todos={todos} />
      </section>
    </div>
  );
};
