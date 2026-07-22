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

    if (title === '') {
      setErrorTitle(true);
    } else {
      setErrorTitle(false);
    }

    if (userId === '') {
      setErrorId(true);
    } else {
      setErrorId(false);
    }

    if (title === '' || userId === '') {
      return;
    }

    const idUser = +userId;

    const findUser = usersFromServer.find(user => user.id === idUser);
    const newId = Math.max(...todosFromServer.map(todo => todo.id)) + 1;

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
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder="Enter a title"
            onChange={event => {
              setTitle(event.target.value);
              setErrorTitle(false);
            }}
          />
          {errorTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={event => {
              setUserId(event.target.value);
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
