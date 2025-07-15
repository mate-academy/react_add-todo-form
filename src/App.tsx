import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [todos, setTodos] = useState(
    todosFromServer.map(todo => ({
      ...todo,
      user: usersFromServer.find(user => user.id === todo.userId) || null,
    })),
  );
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('0');
  const [errors, setErrors] = useState({
    title: '',
    user: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = {
      title: '',
      user: '',
    };

    if (!title.trim()) {
      newErrors.title = 'Please enter a title';
    }

    if (selectedUserId === '0') {
      newErrors.user = 'Please choose a user';
    }

    setErrors(newErrors);

    if (newErrors.title || newErrors.user) {
      return;
    }

    const maxId = Math.max(...todos.map(todo => todo.id));

    const newTodo = {
      id: maxId + 1,
      title: title,
      userId: Number(selectedUserId),
      completed: false,
      user:
        usersFromServer.find(user => user.id === Number(selectedUserId)) ||
        null,
    };

    setTodos(prev => [...prev, newTodo]);

    setTitle('');
    setSelectedUserId('0');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={e => {
              setTitle(e.target.value);
              if (errors.title) {
                setErrors(prev => ({ ...prev, title: '' }));
              }
            }}
            placeholder="Enter a title"
          />
          <span className="error">{errors.title}</span>
        </div>

        <div className="field">
          <label htmlFor="user">User:</label>
          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={e => {
              setSelectedUserId(e.target.value);
              if (errors.user) {
                setErrors(prev => ({ ...prev, user: '' }));
              }
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          <span className="error">{errors.user}</span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
