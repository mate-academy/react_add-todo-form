import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
  user: User | null; // додай це
}

// Property 'users' is missing in type
// '{ todos: { user: { id: number; name: string; username: string; email: string; } | null;
// id: number; title: string; completed: boolean; userId: number; }[]; }'
// but required in type 'Props'.ts(2741)

const getUserById = (userId: number) =>
  usersFromServer.find(user => user.id === userId) || null;
const initialTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState<number>(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title || !userId) {
      setTitleError(!title);
      setUserError(!userId);

      return;
    }

    const newTodo = {
      id: Math.max(...todos.map(todo => todo.id), 0) + 1,
      title,
      completed: false,
      userId: Number(userId),
      user: getUserById(Number(userId)),
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setUserId(0);
    setTitleError(false);
    setUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form action="/api/todos" method="POST" onSubmit={handleAdd}>
        <label htmlFor="titleInput">Title</label>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder="Enter todo title"
            onChange={event => {
              setTitle(event.target.value);
              setTitleError(false);
            }}
          />
          {titleError && <span className="error">Please enter a title</span>}
          <label htmlFor="userSelect">User</label>
        </div>
        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={event => {
              setUserId(Number(event.target.value));
              setUserError(false);
            }}
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
