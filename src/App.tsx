import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [todoList, setTodoList] = useState([...todosFromServer]);

  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);

  const [user, setUser] = useState('0');
  const [userError, setUserError] = useState(false);

  const resetForm = () => {
    setTitle('');
    setUser('0');

    setTitleError(false);
    setUserError(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    const isTitleValid = !!trimmedTitle;
    const isUserValid = user && user !== '0';

    setTitleError(!isTitleValid);
    setUserError(!isUserValid);

    if (!isTitleValid || !isUserValid) {
      return;
    }

    const selectedUser = usersFromServer.find(u => u.id === +user);

    if (!selectedUser) {
      return;
    }

    const maxId =
      todoList.length > 0 ? Math.max(...todoList.map(todo => todo.id)) : 0;
    const newId = maxId + 1;

    const newTodo = {
      id: newId,
      title: trimmedTitle,
      userId: selectedUser.id,
      completed: false,
      user: selectedUser,
    };

    setTodoList(prev => [...prev, newTodo]);

    resetForm();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          {titleError ? (
            <span className="error">Please enter a title</span>
          ) : (
            ''
          )}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            id="user"
            data-cy="userSelect"
            value={user}
            onChange={e => setUser(e.target.value)}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(u => (
              <option value={u.id.toString()} key={u.id}>
                {u.name}
              </option>
            ))}
          </select>

          {userError ? <span className="error">Please choose a user</span> : ''}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todoList} userList={usersFromServer} />
    </div>
  );
};
