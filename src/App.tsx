import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState('0');
  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');
  const handleAllTodo = (event: React.FormEvent) => {
    event.preventDefault();

    let hasError = false;

    if (title.trim() === '') {
      setTitleError('Please enter a title');
      hasError = true;
    } else {
      setTitleError('');
    }

    if (selectedUser === '0') {
      setUserError('Please choose a user');
      hasError = true;
    } else {
      setUserError('');
    }

    if (!hasError) {
      const newTodo = {
        id: todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1,
        title: title.trim(),
        userId: Number(selectedUser),
        completed: false,
      };

      setTodos([...todos, newTodo]);
      setTitle('');
      setSelectedUser('0');
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filteredTitle = e.target.value.replace(/[^a-zA-Z0-9\s]/g, '');

    setTitle(filteredTitle);
    setTitleError('');
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(e.target.value);
    setUserError('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form /* action="/api/todos" method="POST" */ onSubmit={handleAllTodo}>
        <div className="field">
          <label>
            Title:&nbsp;
            <input
              type="text"
              placeholder="Enter a title"
              data-cy="titleInput"
              value={title}
              onChange={handleTitleChange}
            />
          </label>

          {titleError && <span className="error">{titleError}</span>}
        </div>

        <div className="field">
          <label>
            User:&nbsp;
            <select
              data-cy="userSelect"
              value={selectedUser}
              onChange={handleUserChange}
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

          {userError && <span className="error">{userError}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={todos} users={usersFromServer} />
      </section>
    </div>
  );
};
