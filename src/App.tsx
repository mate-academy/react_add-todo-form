import { useState, useEffect } from 'react';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import './App.scss';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User;
};

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [errors, setErrors] = useState({
    title: false,
    user: false,
  });

  useEffect(() => {
    const formattedTodos = todosFromServer.map(todo => ({
      ...todo,
      user: usersFromServer.find(user => user.id === todo.userId)!,
    }));

    setTodos(formattedTodos);
    setUsers(usersFromServer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const titleError = !title.trim();
    const userError = !userId;

    setErrors({
      title: titleError,
      user: userError,
    });

    if (titleError || userError) {
      return;
    }

    const selectedUser = users.find(user => user.id === Number(userId))!;

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
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit} data-cy="form">
        <div className="field">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={e => {
              setTitle(e.target.value);
              setErrors(prev => ({ ...prev, title: false }));
            }}
            placeholder="Enter todo title"
          />
          {errors.title && (
            <span className="error" data-cy="titleError">
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">User:</label>
          <select
            id="user"
            data-cy="userSelect"
            value={userId}
            onChange={e => {
              setUserId(e.target.value);
              setErrors(prev => ({ ...prev, user: false }));
            }}
          >
            <option value="" data-cy="defaultOption">
              Choose a user
            </option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {errors.user && (
            <span className="error" data-cy="userError">
              Please choose a user
            </span>
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
