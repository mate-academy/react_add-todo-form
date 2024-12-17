import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

const usersFromServer = [
  { id: 1, name: 'Leanne Graham', email: 'Sincere@april.biz' },
  { id: 2, name: 'Patricia Lebsack', email: 'Julianne.OConner@kory.org' },
];

const initialTodos = [
  { id: 1, title: 'delectus aut autem', userId: 1, completed: true },
  {
    id: 2,
    title: 'quis ut nam facilis et officia qui',
    userId: 2,
    completed: false,
  },
];

export const App = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState<number | null>(null);
  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setTitleError('');
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUserId = parseInt(e.target.value, 10);

    setUserId(selectedUserId);
    setUserError(selectedUserId === 0 ? 'Please choose a user' : '');
  };

  const handleAddTodo = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      setTitleError('Please enter a title');
    }

    if (!userId) {
      setUserError('Please choose a user');
    }

    if (!title.trim() || !userId) {
      return;
    }

    const newTodo = {
      id: todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1,
      title,
      completed: false,
      userId,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setUserId(null);
    setTitleError('');
    setUserError('');
  };

  return (
    <div className="App">
      <h1>Add TODO Form</h1>

      <form onSubmit={handleAddTodo}>
        <div className="field">
          <label htmlFor="titleInput">Title:</label>
          <input
            id="titleInput"
            type="text"
            value={title}
            onChange={handleTitleChange}
            data-cy="titleInput"
            placeholder="Enter a title"
          />
          {titleError && <span className="error">{titleError}</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User:</label>
          <select
            id="userSelect"
            value={userId || ''}
            onChange={handleUserChange}
            data-cy="userSelect"
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
          {userError && <span className="error">{userError}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} users={usersFromServer} />
    </div>
  );
};
