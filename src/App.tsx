import React, { useState } from 'react';
import './App.scss';

import { TodoList } from './components/TodoList';

import users from './api/users';
import { Todo } from './types/Todo';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);

    if (!title) {
      setTitleError(true);

      return;
    }

    if (!selectedUser) {
      setUserError(true);

      return;
    }

    // Add todo
    const foundUser = users.find(
      currentUser => currentUser.id === selectedUser,
    ); //Renamed parameter

    // const newTodo = {
    //   id:
    //     todos.length > 0
    //       ? Math.max(...todos.map((todo: Todo) => todo.id)) + 1
    //       : 1,
    //   title: title,
    //   userId: selectedUser,
    //   completed: false,
    //   user: users.find(user => user.id === selectedUser),
    // };

    if (!foundUser) {
      setUserError(true);

      return;
    }

    const newTodo: Todo = {
      //Explicit typing for clarity
      id: todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1,
      title: title,
      userId: selectedUser,
      completed: false,
      // user: user, // use the found user here
      user: foundUser,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setSelectedUser(null);
    setTitleError(false);
    setUserError(false);
    setSubmitted(false);
  };

  const handleTitleChange = (
    changeEvent: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTitle(changeEvent.target.value);
    setTitleError(false);
    setSubmitted(false);
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(parseInt(e.target.value, 10) || null);
    setUserError(false);
    setSubmitted(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
          />
          {submitted && titleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">User:</label>
          <select
            id="user"
            data-cy="userSelect"
            value={selectedUser || 0}
            onChange={handleUserChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {submitted && userError && (
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
