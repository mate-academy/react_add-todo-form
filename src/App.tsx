import { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

export interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
  user?: User | null | undefined;
}

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const addTodo = (newTodo: Todo) => {
    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setHasTitleError(!title);
    setHasUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    const user = getUserById(userId);

    if (!user) {
      return;
    }

    const cleanTitle = title.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '');

    const maxId =
      todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) : 0;
    const newId = maxId + 1;

    const newTodo: Todo = {
      id: newId,
      title: cleanTitle,
      userId,
      user,
      completed: false,
    };

    addTodo(newTodo);

    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="post-title">
            Title:&nbsp;
            <input
              id="post-title"
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleTitleChange}
            />
          </label>
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="post-user">
            User:&nbsp;
            <select
              id="post-user"
              data-cy="userSelect"
              value={userId}
              onChange={handleUserIdChange}
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
          </label>
          {hasUserIdError && (
            <span className="error">Please choose a user</span>
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
