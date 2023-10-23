import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { Todo } from './types/Todo';

import { TodoList } from './components/TodoList';

const findUserById = (id: number) => {
  return usersFromServer.find(user => user.id === id) || null;
};

const todosWithUsers = todosFromServer.map(todo => ({
  ...todo,
  user: findUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const [newTodos, setNewTodos] = useState<Todo[]>(todosWithUsers);

  const handleTitleInput = ((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setHasTitleError(false);
  });

  const handleUserSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+e.target.value);
    setHasUserError(false);
  };

  const handleSubmit = ((e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title && !userId) {
      setHasTitleError(!hasTitleError);
      setHasUserError(!hasUserError);

      return;
    }

    if (!title) {
      setHasTitleError(!hasTitleError);

      return;
    }

    if (!userId) {
      setHasUserError(!hasUserError);

      return;
    }

    const newTodo = {
      id: Math.max(...newTodos.map(todo => todo.id)) + 1,
      title,
      userId,
      completed: false,
      user: findUserById(userId),
    };

    setNewTodos(prevState => [...prevState, newTodo]);
    setTitle('');
    setUserId(0);
  });

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a Title"
            value={title}
            onChange={handleTitleInput}
          />

          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUserSelect}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>

          {hasUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={newTodos} />
    </div>
  );
};
