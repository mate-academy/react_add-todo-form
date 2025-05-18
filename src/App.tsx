import './App.scss';
import { TodoList } from './components/TodoList';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

export const App = () => {
  const [title, setTitle] = useState<string>('');
  const [userFormID, setUserFormID] = useState<number>(0);
  const [errors, setErrors] = useState<string[]>([]);

  const [todos, setTodos] = useState<Todo[]>(todosFromServer)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrors([]);

    const newErrors: string[] = [];

    if (!title.trim()) {
      newErrors.push('title');
    }

    if (userFormID === 0) {
      newErrors.push('user');
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);

      return;
    }

    const newId = Math.max(0, ...todosFromServer.map(todo => todo.id)) + 1;

    const newTodo = {
      id: newId,
      title,
      completed: false,
      userId: userFormID,
    };

    setTodos(prev => [...prev, newTodo]);

    setTitle('');
    setUserFormID(0);
    setErrors([]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Type a title"
            value={title}
            onChange={e => {
              setTitle(e.target.value);

              if (errors.includes('title')) {
                setErrors(prev => prev.filter(error => error !== 'title'));
              }
            }}
          />
          {errors.includes('title') && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="select">Select user: </label>
          <select
            id="select"
            data-cy="userSelect"
            value={userFormID}
            onChange={e => {
              const value = Number(e.target.value);

              setUserFormID(value);

              if (errors.includes('user')) {
                setErrors(prev => prev.filter(error => error !== 'user'));
              }
            }}
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
          {errors.includes('user') && (
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
