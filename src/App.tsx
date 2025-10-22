import React, { useEffect, useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { TodoWithUserProps } from './types';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [users, setUsers] = useState(usersFromServer);
  const [todos, setTodos] = useState<TodoWithUserProps[]>([]);
  const [error, setError] = useState<{
    title?: boolean;
    userId?: boolean;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const titleTrimmed = !title.trim();
    const userIdInvalid = userId === 0;

    if (titleTrimmed || userIdInvalid) {
      setError({ title: titleTrimmed, userId: userIdInvalid });

      return;
    }

    const selectedUser = users.find(user => user.id === userId);

    if (!selectedUser) {
      setError({ userId: true });

      return;
    }

    const nextId =
      todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
    const newTodo: TodoWithUserProps = {
      id: nextId,
      title: title.trim(),
      userId: selectedUser.id,
      completed: false,
      user: selectedUser,
    };

    setTodos(prev => [...prev, newTodo]);
    setTitle('');
    setUserId(0);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (error) {
      setError(prev => ({ ...prev, title: false }));
    }
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUserId = parseInt(e.target.value, 10) || 0;

    setUserId(selectedUserId);
    if (error) {
      setError(prev => ({ ...prev, userId: false }));
    }
  };

  // populate todos and users on mount
  useEffect(() => {
    const newTodos: TodoWithUserProps[] = todosFromServer.map(todo => {
      const matchedUsers = usersFromServer.find(
        user => user.id === todo.userId,
      );

      return {
        ...todo,
        user: matchedUsers!,
      };
    });

    setTodos(newTodos);
    setUsers(usersFromServer);
  }, []);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
        data-cy="form"
      >
        <div className="field">
          <label htmlFor="titleInput">Title</label>
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
            placeholder="Add todo form"
          />
          {error?.title && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
          >
            <option value="" data-cy="userSelectOptionDefault">
              Choose a user
            </option>

            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {error?.userId && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
