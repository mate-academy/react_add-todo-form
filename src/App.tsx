import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';

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

const getUserById = (userId: number): User | undefined => {
  return usersFromServer.find(userItem => userItem.id === userId);
};

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(
    todosFromServer
      .map(todo => {
        const user = getUserById(todo.userId);
        return user ? { ...todo, user } : null;
      })
      .filter((todo): todo is Todo => todo !== null),
  );

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const sanitizeTitle = (value: string) => {
    return value.replace(/[^a-zA-Zа-яА-ЯёЁіІїЇєЄ0-9 ]/g, '');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    let hasError = false;

    if (!title.trim()) {
      setTitleError(true);
      hasError = true;
    }

    if (!userId) {
      setUserError(true);
      hasError = true;
    }

    const user = getUserById(+userId);

    if (!user) {
      setUserError(true);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const newId = Math.max(0, ...todos.map(todo => todo.id)) + 1;

    const newTodo: Todo = {
      id: newId,
      title: title.trim(),
      userId: +userId,
      completed: false,
      user,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setUserId('');
    setTitleError(false);
    setUserError(false);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleError(false);
    setTitle(sanitizeTitle(event.target.value));
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserError(false);
    setUserId(event.target.value);
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
          {titleError && <span className="error">Please enter a title</span>}
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
            {usersFromServer.map(userItem => (
              <option key={userItem.id} value={userItem.id}>
                {userItem.name}
              </option>
            ))}
          </select>

          {/* ✅ точний текст, потрібний для E2E */}
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
