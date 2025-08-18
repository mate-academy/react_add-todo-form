import React, { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { User } from './types/User';

function getUserById(userId: number) {
  return usersFromServer.find((user: User) => user.id === userId) || null;
}

const initialTodos: Todo[] = todosFromServer.map((todo: Todo) => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [error, setError] = useState({ title: false, user: false });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const hasError = {
      title: title.trim() === '',
      user: userId === 0,
    };

    setError(hasError);

    if (hasError.title || hasError.user) {
      return;
    }

    const maxId =
      todos.length > 0 ? Math.max(...todos.map((todo: Todo) => todo.id)) : 0;

    const newTodo: Todo = {
      id: maxId + 1,
      title: title.trim(),
      completed: false,
      userId,
      user: getUserById(userId),
    };

    setTodos(prev => [...prev, newTodo]);

    setTitle('');
    setUserId(0);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);

    if (error.title) {
      setError(prev => ({ ...prev, title: false }));
    }
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));

    if (error.user) {
      setError(prev => ({ ...prev, user: false }));
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter todo title"
          />
          {error.title && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
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

          {error.user && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
