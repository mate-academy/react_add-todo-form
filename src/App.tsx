import { useState } from 'react';
import './App.scss';
import 'bulma/css/bulma.css';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import { getUserById, findUserByName } from './helpers/helpers';

export const App = () => {
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [isErrorOnUserSelect, setErrorOnUserSelect] = useState(false);
  const [isErrorOnTitleInput, setErrorOnTitleInput] = useState(false);
  const [todos, setTodos] = useState(getUserById);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
    setErrorOnTitleInput(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(event.currentTarget.value);
    setErrorOnUserSelect(false);
  };

  const handleSubmit = (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorOnTitleInput(!title.trim());
    setErrorOnUserSelect(!selectedUser);

    if (title.trim() === '' || !selectedUser) {
      return;
    }

    const userToAdd = findUserByName(selectedUser);

    setTodos(current => {
      const getNewId = Math.max(...current.map(todo => todo.id));

      return [
        ...current,
        {
          id: getNewId + 1,
          title,
          completed: false,
          userId: userToAdd ? userToAdd.id : null,
          user: userToAdd,
        },
      ];
    });

    setTitle('');
    setSelectedUser('');
  };

  return (
    <div className="App">
      <div className="box has-text-centered">
        <h1 className="title is-1">Add todo form</h1>

        <form className="form" onSubmit={handleSubmit}>
          <div className="field">
            <label
              htmlFor="title"
              className="label"
            >
              Write down your task:
            </label>

            <input
              data-cy="titleInput"
              type="text"
              id="title"
              name="title"
              value={title}
              className="input"
              placeholder="Enter a title"
              onChange={handleTitleChange}
            />

            {isErrorOnTitleInput && (
              <span className="error">
                <br />
                Please enter a title
              </span>
            )}
          </div>

          <div className="field">
            <label
              htmlFor="userSelect"
              className="label"
            >
              Choose user:
            </label>
            <span className="select">
              <select
                data-cy="userSelect"
                id="userSelect"
                name="userSelect"
                value={selectedUser}
                className="select"
                onChange={handleUserChange}
              >
                <option value="" disabled>Choose a user</option>
                {usersFromServer.map(user => (
                  <option key={user.id} value={user.name}>{user.name}</option>
                ))}
              </select>
            </span>
            {isErrorOnUserSelect && (
              <span className="error">
                <br />
                Please choose a user
              </span>
            )}
          </div>

          <button
            type="submit"
            data-cy="submitButton"
            className="button is-primary"
          >
            Add
          </button>
        </form>

        <TodoList todos={todos} />
      </div>
    </div>
  );
};
