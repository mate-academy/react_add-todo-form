import './App.scss';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todo } from './types/Todo';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [todosList, setTodosList] = useState(todos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [isUserChoosen, setIsUserChoosen] = useState(true);
  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const todoId = Math.max(...todosList.map(todo => todo.id)) + 1;

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitleEmpty(false);
    if (!event.target.value.trim()) {
      setIsTitleEmpty(true);
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const id = parseInt(event.target.value, 10);

    setUserId(id);
    setIsUserChoosen(true);
    if (id === 0) {
      setIsUserChoosen(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title.trim()) {
      setIsTitleEmpty(true);
    }

    if (!getUser(userId)) {
      setIsUserChoosen(false);
    }

    if (getUser(userId) && title.trim()) {
      const todo: Todo = {
        id: todoId,
        title,
        completed: false,
        userId,
        user: getUser(userId),
      };

      setTodosList([...todosList, todo]);
      setTitle('');
      setUserId(0);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <div className="field">
          <label htmlFor="titleInput">
            Title:
          </label>
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            id="titleInput"
            value={title}
            onChange={(event) => handleTitleChange(event)}
          />
          {isTitleEmpty && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">
            User:
          </label>
          <select
            data-cy="userSelect"
            id="userSelect"
            value={userId}
            onChange={(event) => handleSelectChange(event)}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => {
              const { name, id } = user;

              return (
                <option
                  value={id}
                  key={id}
                >
                  {name}
                </option>
              );
            })}
          </select>

          {!isUserChoosen && (
            <span className="error">
              Please choose a user
            </span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>
      <TodoList todos={todosList} />
    </div>
  );
};
