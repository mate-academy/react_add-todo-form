import React, { useState } from 'react';

import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types/Todo';

const getUserById = (userId: number) => {
  return usersFromServer.find((user) => user.id === userId) || null;
};

const TodoArr: Todo[] = todosFromServer.map((todo) => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(TodoArr);

  const [title, setTitle] = useState('');
  const [titleIsValid, setTitleIsValid] = useState(true);

  const [userSelect, setUserSelect] = useState(0);
  const [userSelectValid, setUserSelectValid] = useState(true);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value.replace(/[^0-9A-Za-zA-Яа-яҐґЇїЄє\s]/g, ''));

    setTitleIsValid(true);
  };

  const handleUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserSelect(+event.target.value);

    setUserSelectValid(true);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title.trim() === '') {
      setTitleIsValid(false);
    }

    if (userSelect === 0) {
      setUserSelectValid(false);
    }

    if (title.trim() !== '' && userSelect !== 0) {
      setTodos((newTodos) => {
        return [
          ...newTodos,
          {
            id: todos.reduce(
              (maxId, todo) => Math.max(maxId, todo.id), 0,
            ) + 1,
            title: title.trim(),
            userId: userSelect,
            completed: false,
            user: getUserById(+userSelect),
          },
        ];
      });

      setTitle('');
      setUserSelect(0);
    }
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
          <label htmlFor="post-title">
            Title:
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              id="post-title"
              value={title}
              onChange={handleTitle}
            />
            {!titleIsValid && (
              <span className="error">Please enter a title</span>
            )}
          </label>
        </div>

        <div className="field">
          <label>
            User:
            <select
              data-cy="userSelect"
              value={userSelect}
              onChange={handleUser}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {!userSelectValid && (
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
