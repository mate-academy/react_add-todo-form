import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

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

export const App = () => {
  const getUserById = (id: number): User => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const user = usersFromServer.find(u => u.id === id);

    if (!user) {
      return {
        id: 0,
        name: 'Unknown',
        username: 'unknown',
        email: 'unknown@example.com',
      };
    }

    return user;
  };

  const initialTodos = todosFromServer.map(todo => {
    const user = getUserById(todo.userId);

    return { ...todo, user };
  });

  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('0');
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^a-zA-Z0-9\s]/g, '');

    setTitle(value);
    setTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(event.target.value);
    setUserError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const titleIsEmpty = title.trim() === '';
    const userNotSelected = userId === '0';

    setTitleError(titleIsEmpty);
    setUserError(userNotSelected);

    if (titleIsEmpty || userNotSelected) {
      return;
    }

    const numericUserId = Number(userId);
    const user = getUserById(numericUserId);

    if (user.id === 0) {
      setUserError(true);

      return;
    }

    const newTodo: Todo = {
      id: Math.max(0, ...todos.map(todo => todo.id)) + 1,
      title: title.trim(),
      userId: numericUserId,
      completed: false,
      user,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setUserId('0');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title</label>
          <input
            type="text"
            data-cy="titleInput"
            id="titleInput"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter todo title"
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User</label>
          <select
            data-cy="userSelect"
            id="userSelect"
            value={userId}
            onChange={handleUserChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
