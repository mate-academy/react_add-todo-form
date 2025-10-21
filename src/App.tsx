import React, { useState, useEffect } from 'react';
import { TodoList } from './components/TodoList/TodoList';
import usersData from './api/users';
import todosData from './api/todos';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

interface User {
  id: number;
  name: string;
  email: string;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');

  useEffect(() => {
    setUsers(usersData);
    setTodos(
      todosData.map(todo => ({
        ...todo,
        user: usersData.find(user => user.id === todo.userId)!,
      }))
    );
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;

    if (!title.trim()) {
      setTitleError('Please enter a title');
      hasError = true;
    } else {
      setTitleError('');
    }

    if (selectedUser === null) {
      setUserError('Please choose a user');
      hasError = true;
    } else {
      setUserError('');
    }

    if (hasError) return;

    const newTodo: Todo = {
      id: todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1,
      title,
      completed: false,
      userId: selectedUser!,
      user: users.find(user => user.id === selectedUser!)!,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setSelectedUser(null);
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (titleError) setTitleError('');
  };

  const handleUserChange = (value: number) => {
    setSelectedUser(value);
    if (userError) setUserError('');
  };

  return (
    <div>
      <h1>Todo App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          placeholder="Enter title"
          onChange={e => handleTitleChange(e.target.value)}
          data-cy="titleInput"
        />
        {titleError && <div className="error">{titleError}</div>}

        <select
          value={selectedUser ?? ''}
          onChange={e => handleUserChange(Number(e.target.value))}
          data-cy="userSelect"
        >
          <option value="">Choose a user</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        {userError && <div className="error">{userError}</div>}

        <button type="submit" data-cy="submitButton">
          Add Todo
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
