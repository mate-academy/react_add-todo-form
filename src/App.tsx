import './App.scss';
import { FormEvent, useState } from 'react';
import { TodoList } from './components/TodoList/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');
  const [todos, setTodos] = useState(todosFromServer);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const formValidation = () => {
    if (selectedTitle.trim() && selectedUser !== '') {
      return true;
    }

    if (!selectedTitle) {
      setTitleError(true);
    }

    if (selectedUser === '') {
      setUserError(true);
    }

    setTitleError(true);

    return false;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!formValidation()) {
      return;
    }

    const newId = Math.max(...todos.map(todo => todo.id)) + 1;
    const newTodo = {
      id: newId,
      title: selectedTitle,
      userId: +selectedUser,
      completed: false,
    };

    setTodos(prevTodos => {
      return (
        [
          ...prevTodos,
          newTodo,
        ]
      );
    });

    setSelectedTitle('');
    setSelectedUser('');
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
            <input
              type="text"
              data-cy="titleInput"
              value={selectedTitle}
              onChange={(event) => {
                setSelectedTitle(event.target.value);
                setTitleError(false);
              }}
              placeholder="Please enter a title"
            />
          </label>
          {titleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            User:
            <select
              data-cy="userSelect"
              value={selectedUser}
              name="user"
              onChange={(event) => {
                setSelectedUser(event.target.value);
                setUserError(false);
              }}
            >
              <option value="" disabled>Choose a user</option>
              {usersFromServer.map(user => {
                return (
                  <option value={user.id} key={user.id}>{user.name}</option>
                );
              })}
            </select>
          </label>
          {userError && (
            <span className="error">Please choose a user</span>
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
