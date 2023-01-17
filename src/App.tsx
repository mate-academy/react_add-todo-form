import './App.scss';
import React, { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { User } from './types/User';

const getUserById = (userId: number): User | null => {
  return usersFromServer.find((user) => user.id === userId) || null;
};

const todosWithUsers: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState(todosWithUsers);
  const [userId, setUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const clearForm = () => {
    setTitle('');
    setUserId(0);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
    setHasUserIdError(false);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      setHasTitleError(true);

      return;
    }

    if (!userId) {
      setHasUserIdError(true);

      return;
    }

    const maxId = Math.max(...todos.map((todo) => todo.id)) + 1;

    const createdTodo: Todo = {
      id: maxId,
      title,
      userId,
      user: getUserById(userId),
      completed: false,
    };

    setTodos((prevTodos) => (
      [...prevTodos, createdTodo]
    ));

    clearForm();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          {'Title:  '}
          <label className="labelTitle">
            <input
              type="text"
              data-cy="titleInput"
              className="labelTitle"
              placeholder="Enter a title"
              value={title}
              onChange={handleTitleChange}
            />
          </label>
          {hasTitleError
            && (<span className="error">Please enter a title</span>)}
        </div>

        <div className="field">
          <label className="select">
            {'User:  '}
            <select
              data-cy="userSelect"
              className="select"
              value={userId}
              onChange={handleUserChange}
            >
              <option value="0">
                Choose a user
              </option>
              {usersFromServer.map((user) => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}

            </select>
          </label>
          {hasUserIdError && (
            <span className="error">Please choose a user</span>
          )}

        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={todos} />
      </section>
    </div>
  );
};
