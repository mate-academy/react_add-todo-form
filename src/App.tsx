import './App.scss';
import { TodoList } from './components/TodoList';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { useState } from 'react';

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [todos, setTodos] = useState(todosFromServer);
  const [titleErrorMessage, serTitleErrorMessage] = useState('');
  const [userIdError, serUserIdError] = useState(false);

  const addTodo = (event: React.FormEvent) => {
    event.preventDefault();

    const regex = /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ0-9 ]*$/;

    serUserIdError(!userId);

    if (!title.trim()) {
      serTitleErrorMessage('Please enter a title');
    } else if (!regex.test(title)) {
      serTitleErrorMessage('Please enter valid title');
    }

    if (!title.trim() || !userId || !regex.test(title)) {
      return;
    }

    const todoId = ++todos.map(todo => todo.id).sort((a, b) => b - a)[0];

    setTodos([
      ...todos,
      {
        id: todoId,
        title: title,
        completed: false,
        userId: userId,
      },
    ]);

    setTitle('');
    setUserId(0);
  };

  const addTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    serTitleErrorMessage('');
  };

  const addUserId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    serUserIdError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={addTodo}>
        <div className="field">
          <label>
            {`Title: `}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={addTitle}
            />
          </label>
          {titleErrorMessage && (
            <span className="error">{titleErrorMessage}</span>
          )}
        </div>

        <div className="field">
          <label>
            {`User: `}
            <select data-cy="userSelect" value={userId} onChange={addUserId}>
              <option value="0" disabled>
                Choose a user
              </option>
              {usersFromServer.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          </label>
          {userIdError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
