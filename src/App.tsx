import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
// import { User } from './props/userProps';
import './App.scss';

export const App = () => {
  const [users, setUsers] = useState(usersFromServer);
  const [todos, setTodos] = useState(todosFromServer);

  const [title, setTitle] = useState('');
  const [errortTitle, setErrorTitle] = useState(false);

  const [selectUserId, setSelectUserId] = useState(0);
  const [errorSelectUserId, setErrorSelectUserId] = useState(false);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setErrorTitle(false);
  };

  const handleSelectUserId = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectUserId(+event.target.value);
    setErrorSelectUserId(false);
  };

  const createNewTodo = () => {
    // if (users.find((u) => u.id === selectUserId) as User) {
    const id = todos.length > 0 ? Math.max(
      ...todos.map(todo => todo.id),
    ) + 1 : 1;

    return {
      id,
      title,
      completed: false,
      userId: +selectUserId,
    };
    // }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  // const handleSubmit = (event: React.FormEvent<HTMLOptionElement>) => {
    event.preventDefault();

    if (!title || selectUserId === 0) {
      setErrorTitle(!title);
      setErrorSelectUserId(selectUserId === 0);

      return;
    }

    if (users.length > 0) {
      setTodos(prev => [
        ...prev,
        createNewTodo(),
      ]);

      setSelectUserId(0);
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
            value={selectUserId}
            data-cy="userSelect"
            onChange={(e) => handleSelectUserId(e)}
          >
            <option value={0} disabled>Choose a user</option>
            {users.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {errorSelectUserId && (
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
