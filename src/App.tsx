import './App.scss';
import { TodoList } from './components/TodoList';
import { useState } from 'react';

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
  completed: boolean;
  userId: number;
  user?: User;
}

interface FormErrors {
  title: boolean;
  userId: boolean;
}

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(
    todosFromServer.map(todo => ({
      ...todo,
      user: usersFromServer.find(user => user.id === todo.userId),
    })),
  );

  const [users] = useState<User[]>(usersFromServer);
  const [userId, setUserId] = useState<number>(0);
  const [title, setTitle] = useState<string>('');
  const [errors, setErrors] = useState<FormErrors>({
    title: false,
    userId: false,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isTitleValid = title.trim() !== '';
    const isUserIdValid = userId !== 0;

    if (!isTitleValid || !isUserIdValid) {
      setErrors({
        title: !isTitleValid,
        userId: !isUserIdValid,
      });

      return;
    }

    const newTodo = {
      id: todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1,
      title: title.trim(),
      userId,
      completed: false,
      user: users.find(u => u.id === userId),
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter todo title"
            value={title}
            onChange={event => {
              const cleanValue = event.target.value.replace(
                /[^a-zA-Z0-9 ]/g,
                '',
              );

              setTitle(cleanValue);
              setErrors(prevErrors => ({ ...prevErrors, title: false }));
            }}
          />
          {errors.title && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={event => {
              setUserId(Number(event.target.value));
              setErrors(prevErrors => ({ ...prevErrors, userId: false }));
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {errors.userId && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
