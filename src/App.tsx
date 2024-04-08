import { useState, SetStateAction, FormEventHandler } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId) || null,
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [user, setUser] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleTitle: React.ChangeEventHandler<HTMLInputElement> = event => {
    setTitleError(false);
    setTitle(event.target.value);
  };

  const handleUser = (event: { target: { value: SetStateAction<string> } }) => {
    setUserError(false);
    setUser(event.target.value);
  };

  const handleSubmit: FormEventHandler = event => {
    event.preventDefault();
    let isValid = true;

    if (!title) {
      setTitleError(true);
      isValid = false;
    }

    if (!user) {
      setUserError(true);
      isValid = false;
    }

    if (!isValid) {
      return;
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST">
        <div className="field">
          <label htmlFor="title">
            Title:{' '}
            <input
              type="text"
              data-cy="titleInput"
              id="title"
              placeholder="Enter a title"
              value={title}
              onChange={handleTitle}
            />
            {titleError && <span className="error">Please enter a title</span>}
          </label>
        </div>

        <div className="field">
          <label htmlFor="user">
            User:{' '}
            <select
              data-cy="userSelect"
              id="user"
              value={user}
              onChange={handleUser}
            >
              <option value="" disabled>
                Choose a user
              </option>
              {usersFromServer.map(username => {
                return <option key={username.id}>{username.name}</option>;
              })}
            </select>
            {userError && <span className="error">Please choose a user</span>}
          </label>
        </div>

        <button type="submit" data-cy="submitButton" onClick={handleSubmit}>
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
