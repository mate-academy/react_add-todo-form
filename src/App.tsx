import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList/TodoList';
import { useState } from 'react';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const App = () => {
  const [todos, setTodos] = useState(
    todosFromServer.map(todo => ({
      ...todo,
      user: getUserById(todo.userId),
    })),
  );
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [errors, setErrors] = useState({
    title: false,
    userId: false,
  });

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);

    // Clear title error when user starts typing
    setErrors(current => ({
      ...current,
      title: false,
    }));
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));

    // Clear userId error when user selects an option
    setErrors(current => ({
      ...current,
      userId: false,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors = {
      title: title.trim() === '',
      userId: userId === 0,
    };

    setErrors(newErrors);

    if (newErrors.title || newErrors.userId) {
      return;
    }

    // Create new todo
    const maxId = Math.max(...todos.map(todo => todo.id));
    const newTodo = {
      id: maxId + 1,
      title: title.trim(),
      completed: false,
      // Quando o nome da propriedade é igual ao nome da variável,
      // pode escrever apenas uma vez, "property shorthand".
      // exemplo >> userId: userId é igual userId,
      userId,
      user: getUserById(userId),
    };

    // Add new todo to the list
    setTodos([...todos, newTodo]);

    // Reset form
    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title-id">Title: </label>
          <input
            id="title-id"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter a title"
          />
          {errors.title && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user-id">User: </label>
          <select
            id="user-id"
            data-cy="userSelect"
            value={userId}
            onChange={handleUserIdChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map((user: User) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {errors.userId && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
