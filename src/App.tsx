import { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type Todo = {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
  user: User;
};

type FormState = {
  todos: Todo[];
  title: string;
  userId: string;
  errors: {
    title: string;
    user: string;
  };
};

export const App = () => {
  const [form, setForm] = useState<FormState>({
    todos: todosFromServer.map(todo => {
      const numericUserId = Number(todo.userId);

      return {
        ...todo,
        userId: numericUserId,
        user: usersFromServer.find(u => u.id === numericUserId) ?? {
          id: -1,
          name: 'Unknown user',
          username: 'unknown',
          email: 'unknown@example.com',
        },
      };
    }),
    title: '',
    userId: '',
    errors: {
      title: '',
      user: '',
    },
  });

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value;
    const sanitized = newTitle.replace(/[^a-zA-Zа-яА-Яіїєґ0-9 ]/g, '');

    setForm(prev => ({
      ...prev,
      title: sanitized,
      errors: {
        ...prev.errors,
        title: '',
      },
    }));
  }

  function handleUserChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const newUserId = event.target.value;

    setForm(prev => ({
      ...prev,
      userId: newUserId,
      errors: {
        ...prev.errors,
        user: '',
      },
    }));
  }

  function handleAdd(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const errors: { title?: string; user?: string } = {};

    if (!form.title.trim()) {
      errors.title = 'Please enter a title';
    }

    if (!form.userId) {
      errors.user = 'Please choose a user';
    }

    if (Object.keys(errors).length > 0) {
      setForm(prev => ({
        ...prev,
        errors: { ...prev.errors, ...errors },
      }));

      return;
    }

    const maxId =
      form.todos.length > 0 ? Math.max(...form.todos.map(todo => todo.id)) : 0;

    const user = usersFromServer.find(u => u.id === +form.userId);

    if (!user) {
      setForm(prev => ({
        ...prev,
        errors: {
          ...prev.errors,
          user: `User with id ${form.userId} not found`,
        },
      }));

      return;
    }

    const newTodo: Todo = {
      id: maxId + 1,
      title: form.title,
      userId: +form.userId,
      completed: false,
      user: user,
    };

    setForm(prev => ({
      ...prev,
      todos: [...prev.todos, newTodo],
      title: '',
      userId: '',
      errors: { title: '', user: '' },
    }));
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleAdd}>
        <div className="field">
          <label htmlFor="titleInput">Title</label>
          <input
            id="titleInput"
            type="text"
            data-cy="titleInput"
            value={form.title}
            onChange={handleTitleChange}
            placeholder="Enter title"
          />
          {form.errors.title && (
            <span className="error">{form.errors.title}</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User</label>
          <select
            id="userSelect"
            data-cy="userSelect"
            value={form.userId}
            onChange={handleUserChange}
          >
            <option value="">Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {form.errors.user && (
            <span className="error">{form.errors.user}</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={form.todos} />
    </div>
  );
};
