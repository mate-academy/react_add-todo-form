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

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

type PreparedTodo = Todo & { user: User };

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');

  const users = usersFromServer as User[];

  const preparedTodos = useMemo<PreparedTodo[]>(() => {
    return todos.map(todo => ({
      ...todo,
      user: users.find(u => u.id === todo.userId) as User,
    }));
  }, [todos, users]);

  const maxId = useMemo(
    () => todos.reduce((acc, t) => Math.max(acc, t.id), 0),
    [todos],
  );

  // універсальна функція для оновлення значення і очищення помилок
  const handleFieldChange = (
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    error: string,
    setError: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    setValue(value);
    if (error && value.trim() !== '') {
      setError('');
    }
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();

    let valid = true;

    if (title.trim().length === 0) {
      setTitleError('Please enter a title');
      valid = false;
    }

    if (userId === '') {
      setUserError('Please choose a user');
      valid = false;
    }

    if (!valid) {
      return;
    }

    // Allow ua/en letters, digits and spaces only
    const sanitizedTitle = title.replace(
      /[^A-Za-z0-9А-ЩЬЮЯЇІЄҐа-щьюяїієґ ]+/g,
      '',
    );

    const newTodo: Todo = {
      id: maxId + 1,
      title: sanitizedTitle,
      userId: Number(userId),
      completed: false,
    };

    setTodos(prev => [...prev, newTodo]);
    setTitle('');
    setUserId('');
    setTitleError('');
    setUserError('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            data-cy="titleInput"
            placeholder="Enter a todo title"
            value={title}
            onChange={e =>
              handleFieldChange(
                e.target.value,
                setTitle,
                titleError,
                setTitleError,
              )
            }
          />
          {titleError && <div className="error">{titleError}</div>}
        </div>

        <div className="field">
          <label htmlFor="user">User</label>
          <select
            id="user"
            data-cy="userSelect"
            value={userId}
            onChange={e =>
              handleFieldChange(
                e.target.value,
                setUserId,
                userError,
                setUserError,
              )
            }
          >
            <option value="">Choose a user</option>
            {users.map(u => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
          {userError && <div className="error">{userError}</div>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={preparedTodos} />
    </div>
  );
};
