import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [todos, setTodos] = useState([...todosFromServer]);
  const users = usersFromServer;

  const [title, setTitle] = useState('');
  const [selectUser, setSelectUser] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handlerTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handlerUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectUser(event.target.value);
    setUserError(false);
  };

  const handSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const hasTitleError = title.trim() === '';
    const hasUserError = selectUser === '';

    setTitleError(hasTitleError);
    setUserError(hasUserError);

    if (hasTitleError || hasUserError) {
      return;
    }

    const newTodo = {
      id: todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1,
      title,
      userId: Number(selectUser),
      completed: false,
    };

    setTodos(prev => [...prev, newTodo]);
    setTitle('');
    setSelectUser('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handSubmit}>
        <div className="field">
          Title:<span> </span>
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handlerTitleChange}
            placeholder="Enter a title"
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          User:<span> </span>
          <select
            data-cy="userSelect"
            value={selectUser}
            onChange={handlerUserChange}
          >
            <option value="" disabled>
              Choose a user
            </option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} users={users} />
    </div>
  );
};
