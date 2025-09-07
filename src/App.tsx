import './App.scss';
import React, { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user?: User;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

const preparedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (!title || userId === 0) {
      return;
    }

    const newId = todos.length
      ? Math.max(...todos.map(todo => todo.id)) + 1
      : 1;

    const selectedUser = usersFromServer.find(user => user.id === userId);

    if (!selectedUser) {
      throw new Error('User not found');
    }

    const newTodo: Todo = {
      id: newId,
      title,
      completed: false,
      userId,
      user: selectedUser,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setUserId(0);
    setIsSubmitted(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          Title:
          <input
            type="text"
            value={title}
            onChange={e => {
              const cleaned = e.target.value.replace(
                /[^a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ0-9\s]/g,
                '',
              );

              setTitle(cleaned);
            }}
            data-cy="titleInput"
            placeholder="Enter a title"
          />
          {isSubmitted && !title && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          User:
          <select
            value={userId}
            onChange={e => setUserId(Number(e.target.value))}
            data-cy="userSelect"
          >
            <option value={0} disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {isSubmitted && userId === 0 && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={preparedTodos} />
    </div>
  );
};
