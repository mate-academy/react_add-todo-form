import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [userId, setUserId] = useState(0);
  const [todoTitle, setTitle] = useState('');
  const [currentTodos, setCurrentTodos] = useState(todos);
  const [isTitleError, setTitleError] = useState(false);
  const [isUserError, setUserError] = useState(false);

  const clearForm = () => {
    setUserId(0);
    setTitle('');
  };

  const normalizeTitle = (currentTitle: string) => currentTitle
    .replace(/[^а-яА-ЯёЁA-Za-z\s\d]/g, '').trimStart();

  const createId = () => {
    const ids = currentTodos.map(todo => todo.id);

    return Math.max(...ids) + 1;
  };

  const addTodo = () => {
    if (!normalizeTitle(todoTitle)) {
      setTitleError(true);
    }

    if (!userId) {
      setUserError(true);
    }

    if (normalizeTitle(todoTitle) && userId) {
      const newTodo = {
        id: createId(),
        userId: +userId,
        title: normalizeTitle(todoTitle),
        completed: false,
        user: getUser(+userId),
      };

      setCurrentTodos((prevTodos) => [...prevTodos, newTodo]);
      clearForm();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => {
          event.preventDefault();
          addTodo();
        }}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={todoTitle}
            onChange={(event) => {
              setTitle(event.target.value);
              setTitleError(false);
            }}
          />
          {isTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            value={userId}
            data-cy="userSelect"
            onChange={(event) => {
              setUserId(+event.target.value);
              setUserError(false);
            }}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          {isUserError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <section className="TodoList">
        <TodoList todos={currentTodos} />
      </section>
    </div>
  );
};
