import React, { useEffect, useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

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
}

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');

  const filterTitle = (input: string) => {
    return input.replace(/[^a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ0-9 ]/g, '');
  };

  const handleAddTodo = (event: React.FormEvent) => {
    event.preventDefault();

    setTitleError('');
    setUserError('');

    let hasError = false;

    if (!title.trim()) {
      setTitleError('Please enter a title');
      hasError = true;
    } else {
      setTitleError('');
    }

    if (!selectedUserId) {
      setUserError('Please choose a user');
      hasError = true;
    } else {
      setUserError('');
    }

    if (hasError) {
      return;
    }

    const newTodo: Todo = {
      id: todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1,
      title: title.trim(),
      userId: selectedUserId ?? 0,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setSelectedUserId(null);
  };

  useEffect(() => {
    setUsers(usersFromServer);
    setTodos(todosFromServer);
  }, []);

  const todosWithUsers = todos.map(todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId),
  }));

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleAddTodo} action="/api/todos" method="POST">
        <div className="field">
          {'Title: '}
          <input
            placeholder="Enter a title"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={event => {
              setTitle(filterTitle(event.target.value));
              setTitleError('');
            }}
          />
          {titleError && <span className="error">{titleError}</span>}
        </div>

        <div className="field">
          {'User: '}
          <select
            data-cy="userSelect"
            value={selectedUserId || 0}
            onChange={event => {
              setSelectedUserId(Number(event.target.value));
              setUserError('');
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
          {userError && <span className="error">{userError}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todosWithUsers} />
    </div>
  );
};
