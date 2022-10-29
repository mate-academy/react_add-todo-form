import './App.scss';
import { FormEvent, useState } from 'react';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [todos, setTodos] = useState(todosFromServer);
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorUser, setErrorUser] = useState(false);

  const handleTitle = (value: string) => {
    const pattern = /^[A-Za-z0-9а-яА-ЯёЁіІїЇ ]+$/;

    if (value.match(pattern)) {
      setTitle(value);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const todosIdArr = todos.map(todo => todo.id);
    const idNewTodo = Math.max(...todosIdArr) + 1;
    const newTodo = {
      id: idNewTodo,
      title,
      userId,
      completed: false,
    };

    if (title && userId) {
      setTodos([
        ...todos,
        newTodo,
      ]);
      setTitle('');
      setUserId(0);
    }

    setErrorTitle(!title);
    setErrorUser(!userId);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={e => handleSubmit(e)}
      >
        <div className="field">
          <label>
            Title:&nbsp;
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={e => handleTitle(e.target.value)}
            />
          </label>

          {errorTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            User:&nbsp;
            <select
              data-cy="userSelect"
              value={userId}
              onChange={e => setUserId(+e.target.value)}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option
                  value={user.id}
                  key={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </label>

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
