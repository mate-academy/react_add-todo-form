import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { TodoList } from './components/TodoList/TodoList';
import React from 'react';

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user?: User;
};

const prepareTodos = (todosArray: Array<Todo>, usersArray: Array<User>) => {
  return todosArray.map(todo => {
    const foundUser = usersArray.find(user => user.id === todo.userId);

    return {
      ...todo,
      user: foundUser,
    };
  });
};

export const App = () => {
  const [todos, setTodos] = useState(() =>
    prepareTodos(todosFromServer, usersFromServer),
  );

  const [handleUserError, setHandleUserError] = useState(false);
  const [handleTitleError, setHandleTitleError] = useState(false);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    let hasError = false;

    if (title.trim() === '') {
      setHandleTitleError(true);
      hasError = true;
    }

    if (userId === 0) {
      setHandleUserError(true);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const maxId =
      todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) : 0;

    const targetUser = usersFromServer.find(user => user.id === userId);

    const newTodo = {
      id: maxId + 1,
      title: title.trim(),
      completed: false,
      userId: userId,
      user: targetUser,
    };

    setTodos(prev => [...prev, newTodo]);

    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>
            <input
              type="text"
              data-cy="titleInput"
              value={title}
              placeholder="Enter todo title"
              onChange={event => {
                setTitle(event.target.value);
                setHandleTitleError(false);
              }}
            />
            {handleTitleError && (
              <span className="error">Please enter a title</span>
            )}
          </label>
        </div>

        <div className="field">
          <label>
            <select
              data-cy="userSelect"
              value={userId}
              onChange={event => {
                setUserId(+event.target.value);
                setHandleUserError(false);
              }}
            >
              <option value="0" disabled>
                Choose a user
              </option>
              {usersFromServer.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>

            {handleUserError && (
              <span className="error">Please choose a user</span>
            )}
          </label>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      {todos && <TodoList todos={todos} />}
    </div>
  );
};
