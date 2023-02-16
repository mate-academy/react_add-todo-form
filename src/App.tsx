import './App.scss';

import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import { User } from './components/types/User';
import { Todo } from './components/types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [todoList, setTodoList] = useState(todos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [showErrorTitle, setShowErrorTitle] = useState(false);
  const [showErrorUser, setShowErrorUser] = useState(false);

  const showError = () => {
    if (!title && !userId) {
      setShowErrorTitle(true);
      setShowErrorUser(true);
    }

    if (!title) {
      return setShowErrorTitle(true);
    }

    return setShowErrorUser(true);
  };

  const inputHandler = (value: string) => {
    setShowErrorTitle(false);

    return setTitle(value);
  };

  const selectHandler = (value: number) => {
    setShowErrorUser(false);

    return setUserId(value);
  };

  const addTodo = (id: number) => {
    const passForm = () => {
      setShowErrorTitle(false);
      setShowErrorUser(false);
      setTitle('');
      setUserId(0);
    };

    if (userId && title.trim()) {
      const newId = Math.max(...todoList.map(todo => todo.id)) + 1;
      const toCreate = {
        id: newId,
        title,
        completed: false,
        userId,
        user: getUser(id),
      };

      passForm();

      return setTodoList(prev => [...prev, toCreate]);
    }

    return showError();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTodo(userId);
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
          <label>
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Please enter a title"
              value={title}
              onChange={e => inputHandler(e.target.value)}
            />
            {showErrorTitle && (
              <span className="error">Please enter a title</span>
            )}
          </label>
        </div>

        <div className="field">
          <label>
            <select
              data-cy="userSelect"
              value={userId}
              onChange={e => {
                selectHandler(+e.target.value);
              }}
            >
              <option value="0" disabled>
                Choose a user
              </option>
              {usersFromServer.map(({ name, id }) => (
                <option value={id} key={id}>
                  {name}
                </option>
              ))}
            </select>
            {showErrorUser && (
              <span className="error">Please choose a user</span>
            )}
          </label>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todoList} />
    </div>
  );
};
