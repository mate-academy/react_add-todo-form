import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasErrorTitle, setHasErrorTitle] = useState(false);
  const [hasErrorUserId, setHasErrorUserId] = useState(false);

  const preparedTodos = todos.map(todo => ({
    ...todo,
    user: usersFromServer.find(findUser => findUser.id === todo.userId) || null,
  }));

  const reset = () => {
    setTitle('');
    setUserId(0);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title && userId) {
      setTodos([
        ...todos,
        {
          id: Math.max(...todos.map(todo => todo.id)) + 1,
          title,
          completed: false,
          userId,
        },
      ]);
      reset();
    }

    setHasErrorTitle(!title);
    setHasErrorUserId(!userId);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={(event) => handleSubmit(event)}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            name="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          {(hasErrorTitle && !title)
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            name="userSelect"
            data-cy="userSelect"
            value={userId}
            onChange={(event) => setUserId(+event.target.value)}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>

          {(hasErrorUserId && !userId)
            && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={preparedTodos} />
    </div>
  );
};
