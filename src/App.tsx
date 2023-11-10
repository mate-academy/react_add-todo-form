import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { User } from './props/userProps';
import './App.scss';

export const App = () => {
  const [users, setUsers] = useState(usersFromServer);
  const [todos, setTodos] = useState(todosFromServer);

  const [title, setTitle] = useState('');
  const [errortTitle, setErrorTitle] = useState(false);

  const [selectUserName, setSelectUserName] = useState('Choose a user');
  const [errorSelectUserName, setErrorSelectUserName] = useState(false);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setErrorTitle(false);
  };

  const handleSelectUserName = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectUserName(event.target.value);
    setErrorSelectUserName(false);
  };

  const createNewTodo = () => {
    const user = users.find((u) => u.name === selectUserName) as User;
    const id = todos.length > 0 ? Math.max(
      ...todos.map(todo => todo.id),
    ) + 1 : 1;

    return {
      id,
      title,
      completed: false,
      userId: user.id,
    };
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title || selectUserName === 'Choose a user') {
      setErrorTitle(!title);
      setErrorSelectUserName(selectUserName === 'Choose a user');

      return;
    }

    if (users.length > 0) {
      setTodos(prev => [
        ...prev,
        createNewTodo(),
      ]);

      setSelectUserName('Choose a user');
      setTitle('');
    }

    setUsers(usersFromServer);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="field">
          <input
            name="title"
            value={title}
            type="text"
            placeholder="title"
            data-cy="titleInput"
            onChange={(e) => handleTitle(e)}
          />
          {errortTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            name="user"
            value={selectUserName}
            data-cy="userSelect"
            onChange={(e) => handleSelectUserName(e)}
          >
            <option disabled>Choose a user</option>
            {users.map(user => (
              <option
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {errorSelectUserName && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList
        todos={todos}
        users={users}
      />
    </div>
  );
};
