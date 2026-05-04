import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { TodoWithUser } from './types/todo';
import { User } from './types/user';
import { TodoList } from './components/TodoList';

function findUserById(id: number): User | undefined {
  return usersFromServer.find(user => user.id === id);
}

const initialTodos: TodoWithUser[] = todosFromServer.map(item => {
  return {
    ...item,
    user: findUserById(item.userId),
  };
});

function maxIdTodos(list: TodoWithUser[]) {
  const ids = list.map(item => item.id);

  return Math.max(...ids);
}

export const App = () => {
  const [todos, setTodos] = useState<TodoWithUser[]>(initialTodos);
  const [data, setData] = useState({
    title: '',
    userId: 0,
  });

  const [error, setError] = useState({
    title: false,
    userId: false,
  });

  function reset() {
    setData({
      title: '',
      userId: 0,
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!data.title) {
      setError(prev => ({ ...prev, title: true }));
    }

    if (data.userId === 0) {
      setError(prev => ({ ...prev, userId: true }));

      return;
    }

    if (data.userId === 0 || !data.title) {
      return;
    }

    setTodos(prev => [
      ...prev,
      {
        id: maxIdTodos(todos) + 1,
        completed: false,
        ...data,
        title: data.title.trim(),
        user: findUserById(data.userId),
      },
    ]);

    reset();
  }

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;

    const cleanedValue = value
      .replace(/[^a-zA-Zа-яА-ЯіїєґІЇЄҐ0-9 ]/g, '')
      .replace(/[ыъэЁёЫЪЭ]/g, '');

    setData(prev => ({ ...prev, title: cleanedValue }));
    setError(prev => ({ ...prev, title: false }));
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            placeholder="Enter a title"
            type="text"
            data-cy="titleInput"
            value={data.title}
            onChange={event => handleTitleChange(event)}
          />
          {error.title && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={data.userId}
            onChange={event => {
              setData(prev => ({ ...prev, userId: +event.target.value }));
              setError(prev => ({ ...prev, userId: false }));
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {error.userId && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
