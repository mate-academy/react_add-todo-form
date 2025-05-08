import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [selectedUserId, setSelectedUserId] = useState('0');
  const [title, setTitle] = useState('');
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorUser, setErrorUser] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const maxId = Math.max(...todos.map(todo => todo.id));
    const isTitleValid = title.trim() !== '';
    const isUserValid = selectedUserId !== '0';

    setErrorTitle(!isTitleValid);
    setErrorUser(!isUserValid);

    if (isTitleValid && isUserValid) {
      const newItem = {
        id: maxId + 1,
        title: title.trim(),
        completed: false,
        userId: Number(selectedUserId),
      };

      setTodos(prev => [...prev, newItem]);

      setTitle('');
      setSelectedUserId('0');
    }
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            value={title}
            type="text"
            data-cy="titleInput"
            placeholder="Please enter a title"
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
            value={selectedUserId}
            onChange={event => {
              setSelectedUserId(event.target.value);
              setErrorUser(false);
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

          {errorUser && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
