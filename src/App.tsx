import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { TodoWithUser } from './entities/TodoWithUser';
import { findUserById } from './services/userService';
import { getNewTodoID } from './services/todoService';

const todosWithUser: TodoWithUser[] = todosFromServer.map(todo => {
  return {
    ...todo,
    user: findUserById(todo.userId),
  };
});

export const App = () => {
  const [todos, setTodos] = useState(todosWithUser);

  const [reloudForm, setReloudForm] = useState(0);

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserId, setHasUserId] = useState(false);

  const onSubmit = (newTodo: TodoWithUser) => {
    return setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  const reset = () => {
    setTitle('');
    setUserId(0);
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      setHasTitleError(true);
    }

    if (!userId) {
      setHasUserId(true);
    }

    if (!userId || !title) {
      return;
    }

    onSubmit({
      id: getNewTodoID(todos),
      title,
      completed: false,
      userId: userId,
      user: findUserById(userId),
    });

    setReloudForm(reloudForm + 1);

    reset();
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value.trimStart());
    setHasTitleError(false);
  };

  const handleChuseName = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserId(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        key={reloudForm}
        onSubmit={handleOnSubmit}
      >
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleChangeTitle}
            />
          </label>

          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            {'User '}
            <select data-cy="userSelect" onChange={handleChuseName}>
              {userId ? (
                <option value={0} disabled>
                  Choose a user
                </option>
              ) : (
                <option value={0}>Choose a user</option>
              )}

              {usersFromServer.map(user => {
                return (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                );
              })}
            </select>
          </label>

          {hasUserId && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
