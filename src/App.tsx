import { useState } from 'react';
import './App.scss';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList/TodoList';

export const App = () => {
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorUser, setErrorUser] = useState(false);
  const [titleInput, setTitleInput] = useState('');
  const [userID, setUserID] = useState(0);
  const [todos, setTodos] = useState(todosFromServer);

  const addUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userID === 0) {
      setErrorUser(true);
    }
    if (!titleInput) {
      setErrorTitle(true);
    }
    if (userID !== 0 && titleInput) {
      setTodos([
        ...todos,
        {
          id: Math.max(...todos.map(t => t.id)) + 1,
          title: titleInput,
          completed: false,
          userId: userID,
        },
      ]);
      setTitleInput('');
      setUserID(0);
    }
  };
  const selectUser = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setErrorUser(false);
    setUserID(Number(e.target.value));
  };
  const editTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorTitle(false);
    setTitleInput(e.target.value);
  };
  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={addUser}>
        <div className="field">
          <label htmlFor="titleInput">Title:</label>
          <input
            type="text"
            data-cy="titleInput"
            value={titleInput}
            placeholder="Enter a title"
            onChange={editTitle}
          />
          {errorTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User:</label>
          <select data-cy="userSelect" onChange={selectUser}>
            <option value={'0'} key={0} disabled selected>
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
      <TodoList todos={todos} userList={usersFromServer} />
    </div>
  );
};
