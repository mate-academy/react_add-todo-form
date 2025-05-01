import { useState } from 'react';
import './App.scss';
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
  completed: boolean;
  userId: number;
  user: User;
}

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(() =>
    todosFromServer.map(todo => ({
      ...todo,
      user: usersFromServer.find(user => user.id === todo.userId)!,
    })),
  );
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;

    if (!title.trim()) {
      setTitleError('Please enter a title');
      isValid = false;
    } else {
      setTitleError('');
    }

    if (!userId) {
      setUserError('Please choose a user');
      isValid = false;
    } else {
      setUserError('');
    }

    if (!isValid) {
      return;
    }

    const newId = Math.max(...todos.map(todo => todo.id), 0) + 1;
    const user = usersFromServer.find(u => u.id === Number(userId))!;

    setTodos([
      ...todos,
      {
        id: newId,
        title: title.trim(),
        completed: false,
        userId: Number(userId),
        user,
      },
    ]);

    setTitle('');
    setUserId('');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^a-zA-Zа-яА-ЯёЁіІїЇєЄ0-9\s]/g, '');

    setTitle(value);
    if (titleError) {
      setTitleError('');
    }
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    setUserId(value);
    if (userError) {
      setUserError('');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter title"
            value={title}
            onChange={handleTitleChange}
          />
          {titleError && (
            <span className="error" data-cy="titleError">
              {titleError}
            </span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
          >
            <option value="" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {userError && (
            <span className="error" data-cy="userError">
              {userError}
            </span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        {todos.map(todo => (
          <article
            key={todo.id}
            data-id={todo.id}
            className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
          >
            <h2 className="TodoInfo__title">{todo.title}</h2>
            <a className="UserInfo" href={`mailto:${todo.user.email}`}>
              {todo.user.name}
            </a>
          </article>
        ))}
      </section>
    </div>
  );
};
