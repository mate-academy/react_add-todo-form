import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [userSelected, setUserSelected] = useState(true);
  const [titleSelected, setTitleSelected] = useState(true);
  const [todos, setTodos] = useState(todosFromServer);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let hasError = false;

    if (title.trim() === '') {
      setTitleSelected(false);
      hasError = true;
    }

    if (userId === 0) {
      setUserSelected(false);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const max = Math.max(...todos.map(todo => todo.id));
    const foundUser = usersFromServer.find(usr => usr.id === userId);

    if (foundUser) {
      setTodos([
        ...todos,
        {
          id: max + 1,
          title,
          completed: false,
          userId,
        },
      ]);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={e => addTodo(e)}>
        <div className="field">
          <label>
            Title:
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={e => {
                setTitleSelected(true);
                setTitle(e.target.value);
              }}
            />
          </label>
          {!titleSelected && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            User:
            <select
              data-cy="userSelect"
              onChange={e => {
                setUserSelected(true);
                setUserId(+e.target.value);
              }}
            >
              <option value="0" disabled selected={userId === 0}>
                Choose a user
              </option>
              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {!userSelected && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} users={usersFromServer} />
    </div>
  );
};
