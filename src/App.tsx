import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorUserId, setErrorUserId] = useState(false);

  const reset = () => {
    setTitle('');
    setUserId(0);
  }
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setErrorTitle(!title);
    setErrorUserId(!userId);

    if (!title || !userId) {
      return;
    }

    const maxId = Math.max(...todos.map(todo => todo.id));
    const selectedUser = usersFromServer.find(user => user.id === userId);

    const newTodo = {
      id: maxId + 1,
      title: title.trim(),
      userId,
      completed: false,
      user: selectedUser,
    }

    setTodos(currentTodos => [...currentTodos, newTodo]);

    reset();
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}>
        <div className="field">
          Title: <input
            type="text"
            data-cy="titleInput"
            placeholder='Enter a title'
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              setErrorTitle(false);
            }}
          />
          {errorTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          User: <select
            data-cy="userSelect"
            value={userId}
            onChange={event => {
              setUserId(+event.target.value);
              setErrorUserId(false);
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user =>
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            )}

          </select>
          {errorUserId && (
            <span className="error">Please choose a user</span>
          )}
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
      />
    </div>
  );
};
