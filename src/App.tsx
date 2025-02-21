import { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [error, setError] = useState({ title: '', user: '' });

  const handleAddTodo = event => {
    event.preventDefault();
    const newErrors = { title: '', user: '' };

    if (!title.trim()) {
      newErrors.title = 'Please enter a title';
    }

    if (userId === 0) {
      newErrors.user = 'Please choose a user';
    }

    if (newErrors.title || newErrors.user) {
      setError(newErrors);

      return;
    }

    const newTodo = {
      id: Math.max(0, ...todos.map(todo => todo.id)) + 1,
      title,
      userId,
      completed: false,
      user: usersFromServer.find(user => user.id === userId),
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setUserId(0);
    setError({ title: '', user: '' });
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleAddTodo}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={e => {
              setTitle(e.target.value.replace(/[^a-zA-Z0-9\s]/g, ''));
              setError({ ...error, title: '' });
            }}
            placeholder="Enter TODO title"
          />
          {error.title && <span className="error">{error.title}</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={e => {
              setUserId(Number(e.target.value));
              setError({ ...error, user: '' });
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
          {error.user && <span className="error">{error.user}</span>}
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
