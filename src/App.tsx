import React, { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';

type User = {
  id: number;
  name: string;
  email: string;
};

type Todo = {
  id: number;
  title: string;
  user: User;
  completed: boolean;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(
    todosFromServer.map(todo => {
      const user = usersFromServer.find(u => u.id === todo.userId) || {
        id: 0,
        name: 'Unknown',
        email: '',
      };

      return {
        id: todo.id,
        title: todo.title,
        user,
        completed: todo.completed,
      };
    }),
  );

  const [errors, setErrors] = useState<{
    title: string | null;
    user: string | null;
  }>({
    title: null,
    user: null,
  });

  const addTodo = (todo: Omit<Todo, 'id'>) => {
    const maxId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) : 0;

    const newTodo: Todo = {
      id: maxId + 1,
      ...todo,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        onSubmit={e => {
          e.preventDefault();
          const form = e.currentTarget;

          const titleElement = form.elements.namedItem('title');
          const userElement = form.elements.namedItem('user');

          if (
            !(titleElement instanceof HTMLInputElement) ||
            !(userElement instanceof HTMLSelectElement)
          ) {
            return;
          }

          const title = titleElement.value.trim();
          const userId = parseInt(userElement.value, 10);
          const user = usersFromServer.find(u => u.id === userId);

          const newErrors = {
            title: title ? null : 'Please enter a title',
            user: user ? null : 'Please choose a user',
          };

          setErrors(newErrors);

          if (newErrors.title || newErrors.user) {
            return;
          }

          addTodo({
            title,
            user: user as User,
            completed: false,
          });

          setErrors({ title: null, user: null });
          form.reset();
        }}
      >
        <div className="field">
          Title:
          <input
            type="text"
            name="title"
            data-cy="titleInput"
            placeholder="Enter a title"
            onChange={() => {
              setErrors(prev => ({ ...prev, title: null }));
            }}
          />
        </div>

        <div className="field">
          User:
          <select
            name="user"
            data-cy="userSelect"
            defaultValue=""
            onChange={() => {
              setErrors(prev => ({ ...prev, user: null }));
            }}
          >
            <option value="" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        {errors.title && (
          <p className="error" data-cy="errorMessage">
            {errors.title}
          </p>
        )}
        {errors.user && (
          <p className="error" data-cy="errorMessage">
            {errors.user}
          </p>
        )}

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
