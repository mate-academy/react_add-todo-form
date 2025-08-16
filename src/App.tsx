import './App.scss';
import { TodoList } from './components/TodoList/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { mergeData } from './utils/mergeData';

export const App = () => {
  const renderedData = mergeData(todosFromServer, usersFromServer);
  const [dataTodoUsers, setDataTodoUsers] = useState(renderedData);
  const [title, setTitle] = useState<string>('');
  const [hasTitleError, setHasTitleError] = useState<boolean>(false);

  const [selectedUser, setSelectedUser] = useState('0');
  const [selectedUserError, setSelectedUserError] = useState<boolean>(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setHasTitleError(false);
  };

  const handleSelectUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(event.target.value);
    setSelectedUserError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) {
      setHasTitleError(true);

      return;
    }

    if (selectedUser === '0') {
      setSelectedUserError(true);

      return;
    }

    setDataTodoUsers(prevTodos => {
      return [
        ...prevTodos,
        {
          id: Math.max(...prevTodos.map(todo => todo.id)) + 1,
          title: title,
          completed: false,
          userId: +selectedUser,
          user: usersFromServer.find(x => x.id === +selectedUser)!,
        },
      ];
    });

    setTitle('');
    setSelectedUser('0');
  };

  //action="/api/todos" method="POST"
  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            value={title}
            data-cy="titleInput"
            onChange={handleTitleChange}
            placeholder="Enter a title"
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User:</label>
          <select
            id={'user'}
            data-cy="userSelect"
            value={selectedUser}
            onChange={handleSelectUser}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {selectedUserError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList renderedData={dataTodoUsers} />
    </div>
  );
};
