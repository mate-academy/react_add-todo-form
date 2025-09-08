import { useEffect, useState } from 'react';
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
  const [errors, setErrors] = useState({ title: false, user: false });

  useEffect(() => {
    const formattedTodos: Todo[] = todosFromServer.reduce<Todo[]>(
      (acc, todo) => {
        const matchedUser = usersFromServer.find(
          user => user.id === todo.userId,
        );

        if (!matchedUser) {
          return acc;
        }

        acc.push({ ...todo, user: matchedUser });

        return acc;
      },
      [],
    );

    setTodos(formattedTodos);

    setUsers(usersFromServer);
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const titleError = !title.trim();
    const userError = !userId;

    setErrors({ title: titleError, user: userError });

    if (titleError || userError) {
      return;
    }

    const selectedUser = users.find(u => u.id === Number(userId));

    if (!selectedUser) {
      setErrors(prev => ({ ...prev, user: true }));

      return;
    }

    const nextId = Math.max(0, ...todos.map(t => t.id)) + 1;

    const newTodo: Todo = {
      id: nextId,
      title: title.trim(),
      completed: false,
      userId: selectedUser.id,
      user: selectedUser,
    };

    setTodos(prev => [...prev, newTodo]);
    setTitle('');
    setUserId('');
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);

    if (errors.title) {
      setErrors(prev => ({ ...prev, title: false }));
    }
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(event.target.value);

    if (errors.user) {
      setErrors(prev => ({ ...prev, user: false }));
    }
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
            onChange={handleTitleChange}
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
            onChange={handleUserChange}
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
