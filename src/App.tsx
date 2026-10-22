import './App.scss';
import { useState, FormEvent, ChangeEvent } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
  user: User;
}

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    return todosFromServer.map(todo => {
      const user = usersFromServer.find(u => u.id === todo.userId);

      return { ...todo, user: user!, completed: Boolean(todo.completed) };
    });
  });

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState<number | ''>('');
  const [errors, setErrors] = useState<{ title?: string; userId?: string }>({});

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Optional: sanitize (letters ua/en, digits, spaces)
    const sanitized = value.replace(/[^a-zA-Zа-яА-ЯёЁ0-9\s]/g, '');

    setTitle(sanitized);

    if (errors.title) {
      setErrors(prev => ({ ...prev, title: undefined }));
    }
  };

  const handleUserChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    setUserId(value ? Number(value) : '');

    if (errors.userId) {
      setErrors(prev => ({ ...prev, userId: undefined }));
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors: { title?: string; userId?: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Please enter a title';
    }

    if (!userId) {
      newErrors.userId = 'Please choose a user';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      return;
    }

    const maxId = Math.max(...todos.map(todo => todo.id), 0);
    const selectedUser = usersFromServer.find(user => user.id === userId)!;

    const newTodo: Todo = {
      id: maxId + 1,
      title: title.trim(),
      userId: userId as number,
      completed: false,
      user: selectedUser,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);

    setTitle('');
    setUserId('');
    setErrors({});
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="titleInput"
            data-cy="titleInput"
            value={title}
            placeholder="Enter todo title"
            onChange={handleTitleChange}
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User</label>
          <select
            data-cy="userSelect"
            id="userSelect"
            value={userId}
            onChange={handleUserChange}
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

          {errors.userId && <span className="error">{errors.userId}</span>}
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
