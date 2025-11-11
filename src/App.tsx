import { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './components/TodoInfo/TodoInfo';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(
    todosFromServer.map(todo => {
      const user = usersFromServer.find(user => user.id === todo.userId);

      return {
        ...todo,
        user: user || {
          id: 0,
          name: '',
          username: '',
          email: '',
        },
      };
    }),
  );

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [errors, setErrors] = useState<{ title?: string; user?: string }>({});

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Optional: Remove any characters that are not letters, digits, or spaces
    // This regex keeps only letters, digits, and spaces
    const cleanedValue = event.target.value.replace(
      /[^a-zA-Zа-яА-ЯіІєЄґҐ\d\s]/g,
      '',
    );

    setTitle(cleanedValue);

    // Clear error when user starts typing
    if (errors.title) {
      setErrors({ ...errors, title: undefined });
    }
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(event.target.value);

    // Clear error when user selects
    if (errors.user) {
      setErrors({ ...errors, user: undefined });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors: { title?: string; user?: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Please enter a title';
    }

    if (!userId) {
      newErrors.user = 'Please choose a user';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      return;
    }

    const selectedUser = usersFromServer.find(user => user.id === Number(userId));

    if (!selectedUser) {
      return;
    }

    const newTodo: Todo = {
      id: Math.max(...todos.map(todo => todo.id), 0) + 1,
      title: title.trim(),
      completed: false,
      userId: Number(userId),
      user: selectedUser,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setUserId('');
    setErrors({});
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title</label>
          <input
            id="titleInput"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User</label>
          <select
            id="userSelect"
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
          >
            <option value="">Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {errors.user && <span className="error">{errors.user}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
