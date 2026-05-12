import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [userError, setUserError] = useState(false);
  const [todos, setTodos] = useState(todosFromServer);
  const [titleError, setTitleError] = useState(false);

  const hundleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setTitleError(true);
    }

    if (!userId) {
      setUserError(true);
    }

    if (!title.trim() || !userId) {
      return;
    }

    const newTodo = {
      id: Math.max(...todos.map(t => t.id)) + 1,
      title,
      userId,
      completed: false,
      user: usersFromServer.find(u => u.id === userId),
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={hundleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={e => {
              setTitle(e.target.value);
              setTitleError(false);
            }}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={e => {
              setUserId(Number(e.target.value));
              setUserError(false);
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

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        {todos.map(todo => (
          <article
            data-id={todo.id}
            key={todo.id}
            className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
          >
            <h2 className="TodoInfo__title">{todo.title}</h2>
            <a
              className="UserInfo"
              href={`mailto:${usersFromServer.find(u => u.id === todo.userId)?.email}`}
            >
              {usersFromServer.find(u => u.id === todo.userId)?.name}
            </a>
          </article>
        ))}
      </section>
    </div>
  );
};
