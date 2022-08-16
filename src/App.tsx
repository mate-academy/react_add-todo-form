import './App.scss';
import { FormEvent, useState } from 'react';
import { TodoList } from './components/TodoList/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App = () => {
  const [selectedTitle, setSelectedTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [selectedUser, setSelectedUser] = useState('-1');
  const [todos, setTodos] = useState(todosFromServer);

  const validate = () => {
    if (selectedTitle && selectedUser !== '-1') {
      return true;
    }

    if (!selectedTitle) {
      setTitleError(true);
    }

    if (selectedUser === '-1') {
      setUserError(true);
    }

    return false;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    const newId = todos
      .reduce((acc, curr) => Math.max(acc, curr.id), -1) + 1;

    const newTodo = {
      id: newId,
      title: selectedTitle,
      userId: +selectedUser,
      completed: false,
    };

    setSelectedTitle('');
    setSelectedUser('-1');

    setTodos(prevTodos => [
      ...prevTodos,
      newTodo,
    ]);
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
            Title:

            {' '}

            <input
              type="text"
              data-cy="titleInput"
              value={selectedTitle}
              onChange={event => {
                setTitleError(false);
                setSelectedTitle(event.target.value.split('')
                  .filter(c => c.match(/[a-z]|[A-Z]|[а-я]|[А-Я]| /)).join(''));
              }}
              placeholder="Enter a title"
            />
          </label>

          {titleError && (
            <span className="error">
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <label>
            User:

            {' '}

            <select
              data-cy="userSelect"
              value={selectedUser}
              onChange={event => {
                setUserError(false);
                setSelectedUser(event.target.value);
              }}
            >
              <option value="-1" disabled>Choose a user</option>

              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>{user.name}</option>
              ))}
            </select>
          </label>

          {userError && (
            <span className="error">
              Please choose a user
            </span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} users={usersFromServer} />
    </div>
  );
};
