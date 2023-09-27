import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [todos, setTodos] = useState([...todosFromServer]);
  const [errorText, setErrorTitle] = useState(false);
  const [errorUser, setErrorUser] = useState(false);
  const [touched, setTouched] = useState(false);

  function handleTitle() {
    setTouched(true);
    setErrorTitle(false);
  }

  function handleUserId() {
    setTouched(true);
    setErrorUser(false);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErrorTitle((!title) || (touched && title.trim() === ''));
    setErrorUser(userId === 0);

    if (!touched || (touched && (!title || title.trim() === ''))
      || (touched && userId === 0)) {
      return;
    }

    const newIdComment = Math.max(...todos.map((todo) => todo.id), 0) + 1;
    const newComment = {
      id: newIdComment,
      title,
      completed: false,
      userId,
    };

    setTodos([...todos, newComment]);
    setTitle('');
    setUserId(0);
    setErrorTitle(false);
    setErrorUser(false);
    setTouched(false);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="text">Title:</label>
          <input
            id="text"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={event => setTitle(event.target.value)}
            onBlur={handleTitle}
          />
          {errorText && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User:</label>
          <select
            id="user"
            data-cy="userSelect"
            value={userId}
            onChange={event => setUserId(+event.target.value)}
            onBlur={handleUserId}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map((paramUser) => (
              <option key={paramUser.id} value={paramUser.id}>
                {paramUser.name}
              </option>
            ))}
          </select>
          {errorUser && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList
        todos={todos}
        users={usersFromServer}
      />
    </div>
  );
};
