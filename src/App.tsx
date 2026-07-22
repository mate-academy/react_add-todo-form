import { useState } from 'react';

import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorId, setErrorId] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title.trim() === '') {
      setErrorTitle(true);
    } else {
      setErrorTitle(false);
    }

    if (userId === '') {
      setErrorId(true);
    } else {
      setErrorId(false);
    }

    if (title.trim() === '' || userId === '') {
      return;
    }

    const idUser = +userId;

    const findUser = usersFromServer.find(user => user.id === idUser);
    const newId = Math.max(...todos.map(todo => todo.id)) + 1;

    const newTodo = {
      id: newId,
      title,
      userId: idUser,
      completed: false,
      user: findUser,
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
            id="titleInput"
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder="Enter a title"
            onChange={titleEvent => {
              setTitle(titleEvent.target.value);
              setErrorTitle(false);
            }}
          />
          {errorTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            id="userSelect"
            data-cy="userSelect"
            value={userId}
            onChange={userEvent => {
              setUserId(userEvent.target.value);
              setErrorId(false);
            }}
          >
            <option value="">Choose a user</option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {errorId && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
