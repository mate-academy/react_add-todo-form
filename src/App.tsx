import './App.scss';
import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App = () => {
  interface User {
    id: number;
    name: string;
    username: string;
    email: string;
  }

  interface Todo {
    id: number;
    title: string;
    userId: number;
    completed: boolean;
    user?: User;
  }

  type InputEvent =
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLSelectElement>;

  type SelectEvent = React.ChangeEvent<HTMLSelectElement>;

  type SubmitEvent = React.FormEvent<HTMLFormElement>;

  const [todos, setTodos] = useState(todosFromServer);
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');

  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();

    let hasError = false;

    if (!title.trim()) {
      setTitleError(true);
      hasError = true;
    }

    if (!userId) {
      setUserError(true);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const selectedUser = usersFromServer.find(
      (user: User) => user.id === userId,
    );

    if (!selectedUser) {
      setUserError(true);

      return;
    }

    const maxId = Math.max(...todos.map((todo: Todo) => todo.id), 0);

    const newTodo = {
      id: maxId + 1,
      title,
      userId,
      completed: false,
      user: selectedUser,
    };

    setTodos([...todos, newTodo]);

    setTitle('');
    setUserId(0);
  };

  const handleTitleChange = (event: InputEvent) => {
    const normalizedValue = event.currentTarget.value.replace(
      /[^a-zA-Z0-9 ]/g,
      '',
    );

    setTitle(normalizedValue);
    setTitleError(false);
  };

  const handleUserChange = (event: SelectEvent) => {
    setUserId(Number(event.currentTarget.value));
    setUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />

          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map((user: User) => (
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

      <section className="TodoList">
        {todos.map((todo: Todo) => (
          <article
            key={todo.id}
            data-id={todo.id}
            className={
              todo.completed ? 'TodoInfo TodoInfo--completed' : 'TodoInfo'
            }
          >
            <h2 className="TodoInfo__title">{todo.title}</h2>
            {todo.user && (
              <a className="UserInfo" href={`mailto:${todo.user.email}`}>
                {todo.user.name}
              </a>
            )}
          </article>
        ))}
      </section>
    </div>
  );
};
