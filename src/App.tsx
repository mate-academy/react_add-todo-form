import './App.scss';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoWithUser } from './types/TodoWithUser';
import { User } from './types/User';

export const App = () => {
  const todosWithUser = todosFromServer.map(todo => ({
    ...todo,
    user: usersFromServer.find(user => (user.id === todo.userId)) as User,
  }));

  const [visibleTodos, setVisibleTodos] = useState(todosWithUser);

  const [title, setTitle] = useState('');
  const [titleTouched, setTitleTouched] = useState(false);
  const hasTitleError = titleTouched && !title;

  const [user, setUser] = useState('0');
  const [userTouched, setUserTouched] = useState(false);
  const hasUserError = userTouched && user === '0';

  const clear = () => {
    setTitle('');
    setUser('0');
    setTitleTouched(false);
    setUserTouched(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || user === '0') {
      setTitleTouched(true);
      setUserTouched(true);

      return;
    }

    const newTodo: TodoWithUser = {
      id: Math.max(...visibleTodos.map(todo => todo.id)) + 1,
      title,
      completed: false,
      user: usersFromServer.find(u => (u.id === +user)) as User,
      userId: +user,
    };

    setVisibleTodos([
      ...visibleTodos,
      newTodo,
    ]);

    clear();
  };

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
            onChange={e => setTitle(e.target.value)}
            onBlur={() => setTitleTouched(true)}
            placeholder="Enter a title"
            value={title}
          />
          {!hasTitleError
            || <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            onChange={e => setUser(e.target.value)}
            value={user}
            onBlur={() => setUserTouched(true)}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(u => (
              <option value={u.id}>{u.name}</option>
            ))}
          </select>

          {!hasUserError || <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todosWithUser={visibleTodos} />
    </div>
  );
};
