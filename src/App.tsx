import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { ChangeEvent, useState } from 'react';
import { TodoList } from './components/TodoList';
import { Todo, User } from './types';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [errorTitle, setErrorTitle] = useState('');
  const [errorUser, setErrorUser] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let isValid = true;

    if (!title.trim()) {
      setErrorTitle('Please enter a title');
      isValid = false;
    } else {
      setErrorTitle('');
    }

    if (!userId) {
      setErrorUser('Please choose a user');
      isValid = false;
    } else {
      setErrorUser('');
    }

    if (!isValid) {
      return;
    }

    const newTodo: Todo = {
      id: Math.max(0, ...todos.map(todo => todo.id)) + 1,
      title: title.trim().replace(/[^a-zA-Z0-9\s]/g, ''),
      completed: false,
      userId: Number(userId),
      user: usersFromServer.find(user => user.id === Number(userId)) as User,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setUserId('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            type="text"
            id="titleInput"
            data-cy="titleInput"
            value={title}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setTitle(event.target.value)
            }
          />
          {errorTitle && <span className="error">{errorTitle}</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            id="userSelect"
            data-cy="userSelect"
            value={userId}
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
              setUserId(event.target.value)
            }
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

          {errorUser && <span className="error">{errorUser}</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          disabled={!title.trim() || !userId}
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} users={usersFromServer} />
    </div>
  );
};
