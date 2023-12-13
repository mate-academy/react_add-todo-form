import './App.scss';
import { FormEventHandler, useState } from 'react';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import todosFromServer from './api/todos';

export const App = () => {
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();

    if (!title) {
      setTitleError('Please enter a title');
    }

    if (!selectedUser) {
      setUserError('Please choose a user');
    }

    const foundUser = usersFromServer.find(user => user.name === selectedUser);
    const newId = Math.max(...todosFromServer.map(todo => todo.id));

    if (title && selectedUser && foundUser) {
      todosFromServer.push({
        id: newId + 1,
        title,
        completed: false,
        userId: foundUser.id,
      });

      setTitle('');
      setSelectedUser('');
    }
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);

    setTitleError('');
  };

  const handleUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(event.target.value);

    setUserError('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit} action="/api/todos" method="POST">
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            placeholder="Enter a title"
            data-cy="titleInput"
            value={title}
            onChange={handleTitle}
          />
          {titleError && (
            <span className="error">{titleError}</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            data-cy="userSelect"
            id="user"
            value={selectedUser}
            onChange={handleUser}
          >
            <option value="" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id}>{user.name}</option>
            ))}
          </select>

          {userError && (
            <span className="error">{userError}</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={todosFromServer} />
    </div>
  );
};
