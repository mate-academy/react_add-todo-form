import { useState } from 'react';
import './App.scss';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { TodoList } from './components/TodoList';
import { Todo } from './types/todo';

export const App = () => {
  const [user, setUser] = useState('0');
  const [todos, setTodos] = useState(todosFromServer);
  const [title, setTitle] = useState('');
  const [userError, setUserError] = useState(false);
  const [titleError, setTitleError] = useState(false);

  const clearFormFields = () => {
    setTitle('');
    setUser('0');
    setUserError(false);
    setTitleError(false);
  };

  // eslint-disable-next-line prettier/prettier, max-len
  const handleUserSelect: React.ChangeEventHandler<HTMLSelectElement> = event => {
    setUser(event.target.value);
    setUserError(false);
  };

  // eslint-disable-next-line max-len, prettier/prettier
  const handleTitleChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const pattern = /[^\w\d\u{0410}-\u{044F}\s]/gu;
    const validTitle = event.target.value.replace(pattern, '');

    setTitle(validTitle);
    setTitleError(false);
  };

  const createTodoId = (todoList: Todo[]) => {
    const idList = todoList.map(todo => todo.id);

    return Math.max(...idList) + 1;
  };

  const handleSubmit: React.FormEventHandler = event => {
    event.preventDefault();

    setTitleError(!title.trim());
    setUserError(!+user);

    if (!title.trim() || !+user) {
      return;
    }

    const todo = {
      id: createTodoId(todos),
      title,
      completed: false,
      userId: +user,
    };

    setTodos([...todos, todo]);

    clearFormFields();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              data-cy="titleInput"
              placeholder="Enter a title"
            />
          </label>
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={user}
              onChange={handleUserSelect}
            >
              <option value="0" disabled>
                Choose a user
              </option>
              {usersFromServer.map(u => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </label>

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
