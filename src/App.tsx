import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

const todosWithUsers = todosFromServer.map((todo) => {
  return {
    ...todo,
    user: usersFromServer.find(user => user.id === todo.userId) || null,
  };
});

export const App:React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(todosWithUsers);
  const [title, setTitle] = useState('');
  const [userName, setUserName] = useState('');
  const [hasTitleError, setIsEmptyTitle] = useState(false);
  const [hasUserError, setIsEmptyUser] = useState(false);

  const nextId = () => {
    const todosIds = todos.map(todo => todo.id);

    return (Math.max(...todosIds) + 1);
  };

  const resetForm = () => {
    setTitle('');
    setUserName('');
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const reg = /[^A-Za-z0-9a-я ]/;

    setIsEmptyTitle(false);

    setTitle(value.replace(reg, ''));
  };

  const handleUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setIsEmptyUser(false);

    setUserName(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const user = usersFromServer.find(selectUser => (
      selectUser.name === userName
    )) || null;

    setIsEmptyTitle(!title);

    setIsEmptyUser(!userName);

    const newTodo: Todo = {
      id: nextId(),
      title: title.trim(),
      completed: false,
      userId: user?.id || null,
      user,
    };

    if (user && title) {
      setTodos(current => [...current, newTodo]);
      resetForm();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form
        onSubmit={handleSubmit}
        action="/api/users"
        method="POST"
      >
        <div className="field">
          {'Title: '}
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitle}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          {'User: '}
          <select
            data-cy="userSelect"
            value={userName}
            onChange={handleUser}
          >
            <option
              defaultValue="Choose a user"
              disabled
              value=""
            >
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option
                key={user.id}
                value={user.name}
              >
                {user.name}
              </option>
            ))}
          </select>

          {hasUserError && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
