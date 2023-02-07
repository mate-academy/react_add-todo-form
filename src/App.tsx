import React, { ChangeEvent, FormEvent, useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

const initialTodos: Todo[] = todosFromServer.map(todo => (
  {
    ...todo,
    user: usersFromServer.find(user => user.id === todo.userId) || null,
  }
));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [canShowTitleError, setCanShowTitleError] = useState(false);
  const [canShowSelectError, setCanShowSelectError] = useState(false);
  const [todos, setTodos] = useState(initialTodos);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setUserId(+value);
    setCanShowSelectError(false);
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setTitle(value);
    setCanShowTitleError(false);
  };

  const reset = () => {
    setTitle('');
    setUserId(0);
    setCanShowTitleError(false);
    setCanShowSelectError(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title.length === 0) {
      setCanShowTitleError(true);
    }

    if (userId === 0) {
      setCanShowSelectError(true);
    }

    if (title.length > 0 && userId !== 0) {
      const todoId = Math.max(...todos.map(todo => todo.id)) + 1;
      const currentUser = usersFromServer.find(user => user.id === +userId)
        || null;

      const newTodo = {
        id: todoId,
        title,
        completed: false,
        userId,
        user: currentUser,
      };

      setTodos((currentTodos) => [...currentTodos, newTodo]);
      reset();
    }
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
          <label htmlFor="title" className="label">Title: </label>
          <input
            className="input"
            type="text"
            data-cy="titleInput"
            id="title"
            placeholder="Enter a title"
            name="title"
            value={title}
            onChange={handleTitleChange}
          />

          {canShowTitleError
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user" className="label">User: </label>
          <div className="select">
            <select
              data-cy="userSelect"
              id="user"
              value={userId}
              onChange={handleSelectChange}
            >
              <option value="0" disabled>Choose a user</option>

              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          {canShowSelectError
            && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
