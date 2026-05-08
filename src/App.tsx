import { useState } from 'react';

import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User;
};

type User = {
  id: number;
  name: string;
  email: string;
  username: string;
} | null;

const getTodos = (): Todo[] => {
  return todosFromServer.map(todo => {
    const user = usersFromServer.find(item => item.id === todo.userId);

    return {
      ...todo,
      user: user || null,
    };
  });
};

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(getTodos());
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  function onAddPost(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSubmitted(true);

    if (!title) {
      return;
    }

    if (!userId) {
      return;
    }

    const newTodo: Todo = {
      id: Math.max(...todos.map(todo => todo.id)) + 1,
      title,
      completed: false,
      userId,
      user: usersFromServer.find(user => user.id === userId) || null,
    };

    setTodos([...todos, newTodo]);

    setTitle('');
    setUserId(0);
    setSubmitted(false);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={onAddPost}>
        <label htmlFor="title">
          Title
        </label>

        <div className="field">
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter title"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />

          {submitted && !title && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">
            User
          </label>
          
          <select
            id="user"
            data-cy="userSelect"
            value={userId}
            onChange={event => setUserId(Number(event.target.value))}
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

          {submitted && !userId && (
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
