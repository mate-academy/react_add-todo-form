import './App.scss';
import React, { useState, useEffect } from 'react';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
  user: User;
}

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState<number | ''>('');
  const [error, setError] = useState({ title: '', user: '' });
  const [users, setUsers] = useState<User[]>([]);

  // Fetch users and initialize todos
  useEffect(() => {
    const fetchData = async () => {
      const fetchedUsers = await usersFromServer;

      // Map todos to include user details
      const initialTodos = todosFromServer
        .map(todo => {
          const matchUser = fetchedUsers.find(user => user.id === todo.userId);

          if (!matchUser) {
            return null; // Exclude todos without a matched user
          }

          return { ...todo, user: matchUser };
        })
        .filter((todo): todo is Todo => todo !== null); // Type guard to filter out null values

      setUsers(fetchedUsers);
      setTodos(initialTodos);
    };

    fetchData();
  }, []);

  const addTodo = (todoTitle: string, selectedUserId: number) => {
    const foundUser = users.find(user => user.id === selectedUserId);

    if (foundUser) {
      const newTodo: Todo = {
        id: todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1,
        title: todoTitle,
        userId: selectedUserId,
        completed: false,
        user: foundUser,
      };

      setTodos([...todos, newTodo]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    let hasError = false;
    const newError = { title: '', user: '' };

    if (!title.trim()) {
      newError.title = 'Please enter a title';
      hasError = true;
    }

    if (!userId) {
      newError.user = 'Please choose a user';
      hasError = true;
    }

    setError(newError);

    if (!hasError) {
      addTodo(title, Number(userId));
      setTitle('');
      setUserId('');
      setError({ title: '', user: '' });
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={changeEvent => {
              setTitle(changeEvent.target.value);
              if (error.title) {
                setError(prev => ({ ...prev, title: '' }));
              }
            }}
          />
          {error.title && (
            <span className="error" style={{ color: 'red' }}>
              {error.title}
            </span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            data-cy="userSelect"
            value={userId}
            onChange={changeEvent => {
              setUserId(Number(changeEvent.target.value) || '');
              if (error.user) {
                setError(prev => ({ ...prev, user: '' }));
              }
            }}
          >
            <option value="" disabled>
              Choose a user
            </option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {error.user && (
            <span className="error" style={{ color: 'red' }}>
              {error.user}
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
