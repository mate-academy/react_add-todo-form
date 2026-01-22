import React, { useMemo, useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type TodoFromServer = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

type TodoWithUser = TodoFromServer & {
  user: User;
};

const sanitizeTitle = (value: string) => {
  // Optional requirement: only letters (ua/en), digits, spaces
  // remove any other characters
  return value.replace(/[^0-9A-Za-zА-Яа-яІіЇїЄєҐґ\s]/g, '');
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoFromServer[]>(todosFromServer);
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');

  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const preparedTodos: TodoWithUser[] = useMemo(() => {
    return todos
      .map(todo => {
        const user = usersFromServer.find(u => u.id === todo.userId);

        if (!user) {
          return null;
        }

        return {
          ...todo,
          user,
        };
      })
      .filter((todo): todo is TodoWithUser => todo !== null);
  }, [todos]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = sanitizeTitle(event.target.value);

    setTitle(nextValue);

    if (titleError) {
      setTitleError(false);
    }
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(event.target.value);

    if (userError) {
      setUserError(false);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const normalizedTitle = title.trim();
    const hasTitle = normalizedTitle.length > 0;
    const hasUser = selectedUserId !== '';

    if (!hasTitle) {
      setTitleError(true);
    }

    if (!hasUser) {
      setUserError(true);
    }

    if (!hasTitle || !hasUser) {
      return;
    }

    const userId = Number(selectedUserId);
    const user = usersFromServer.find(u => u.id === userId);

    if (!user) {
      setUserError(true);

      return;
    }

    const maxId = todos.reduce((max, todo) => Math.max(max, todo.id), 0);

    const newTodo: TodoFromServer = {
      id: maxId + 1,
      title: normalizedTitle,
      userId,
      completed: false,
    };

    setTodos(prev => [...prev, newTodo]);

    setTitle('');
    setSelectedUserId('');
    setTitleError(false);
    setUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={handleUserChange}
          >
            <option value="">Choose a user</option>

            {usersFromServer.map(userItem => (
              <option key={userItem.id} value={userItem.id}>
                {userItem.name}
              </option>
            ))}
          </select>

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      {/* Tu ma być docelowo TodoList z komponentów */}
      <TodoList todos={preparedTodos} />
    </div>
  );
};
