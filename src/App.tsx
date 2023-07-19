import './App.scss';

import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { ArrayOfTodos, Todos } from './components/types/Todos';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId)
    || null;
}

export const todosWithUser: ArrayOfTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<ArrayOfTodos>(todosWithUser);
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

  const addTodos = (newTodo: Todos) => {
    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();

    if (title && userId) {
      addTodos({
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
          {'Title: '}
          <input
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
          {'User: '}
          <select
            data-cy="userSelect"
            required
            value={userId}
            onChange={handleUserIdChange}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
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
