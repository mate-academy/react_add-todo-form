import { FormEvent, useState } from 'react';

import './App.scss';
import { TodoList } from './components/TodoList/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState(todosFromServer);
  const [titleError, setTitleError] = useState(false);
  const [selectedUserError, setSelectedUserError] = useState(false);

  const validation = () => {
    let spaces = 0;

    if (selectedUser && title.trim()) {
      return true;
    }

    if (selectedUser === '') {
      setSelectedUserError(true);
    }

    if (title.includes(' ')) {
      for (let i = 0; i < title.length; i += 1) {
        if (title[i] === ' ') {
          spaces += 1;
        }
      }
    }

    if (title === '' || spaces === title.length) {
      setTitleError(true);
    }

    return false;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!validation()) {
      return;
    }

    const newId = Math.max(...todos.map(todo => todo.id)) + 1;
    const newTodo = {
      id: newId,
      title,
      userId: +selectedUser,
      completed: false,
    };

    setTodos(prevTodos => ([...prevTodos, newTodo]));
    setSelectedUser('');
    setTitle('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              name="title"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={(event => {
                setTitle(event.target.value);
                setTitleError(false);
              })}
            />
          </label>
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={selectedUser}
              name="user"
              onChange={(event) => {
                setSelectedUser(event.target.value);
                setSelectedUserError(false);
              }}
            >
              <option value="" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          {selectedUserError && (
            <span className="error">
              Please choose a user
            </span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
