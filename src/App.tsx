import { useState } from 'react';
import './App.scss';
import 'bulma/css/bulma.css';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import { getUserById, findUserById } from './helpers/helpers';

export const App = () => {
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [isErrorOnUserSelect, setErrorOnUserSelect] = useState(false);
  const [isErrorOnTitleInput, setErrorOnTitleInput] = useState(false);
  const [todos, setTodos] = useState(getUserById);

  const removeSpacesFromTittle = title.trim();

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
    setErrorOnTitleInput(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.currentTarget.value);
    setErrorOnUserSelect(false);
  };

  const handleSubmit = (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorOnTitleInput(!removeSpacesFromTittle);
    setErrorOnUserSelect(!selectedUserId);

    if (removeSpacesFromTittle === '' || !selectedUserId) {
      return;
    }

    const userToAdd = findUserById(selectedUserId);

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
    setSelectedUserId(0);
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
                value={selectedUserId}
                className="select"
                onChange={handleUserChange}
              >
                <option value={0} disabled>Choose a user</option>
                {usersFromServer.map(user => (
                  <option key={user.id} value={user.id}>{user.name}</option>
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
