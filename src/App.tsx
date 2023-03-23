import React, { useState } from 'react';
import './App.scss';

import { TodoList } from './components/TodoList';

import { User } from './types/User';
import { Todo } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUserById(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const todosInitial: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

let nextTodoId = Math.max(...todosInitial.map(todo => todo.id)) + 1;

export const App = () => {
  const [todos, setTodos] = useState(todosInitial);

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [isTitleValid, setIsTitleValid] = useState(false);
  const [isUserIdValid, setIsUserIdValid] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const validateFields = (): boolean => {
    let isFieldsValid = true;

    if (!title) {
      setIsTitleValid(false);
      isFieldsValid = false;
    }

    if (!userId) {
      setIsUserIdValid(false);
      isFieldsValid = false;
    }

    return isFieldsValid;
  };

  const addNewTodo = (): void => {
    const newTodo: Todo = {
      id: nextTodoId,
      userId,
      title,
      completed: false,
      user: getUserById(userId),
    };

    setTodos((prevTodos) => [
      ...prevTodos,
      newTodo,
    ]);

    nextTodoId += 1;
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setIsFormSubmitted(true);

    const isEachFieldValid = validateFields();

    if (isEachFieldValid) {
      addNewTodo();
      setTitle('');
      setUserId(0);
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitleValid(true);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
    setIsUserIdValid(true);
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
          <label htmlFor="todoTitle">
            {'Title: '}
            <input
              type="text"
              name="title"
              id="todoTitle"
              placeholder="Ener a title"
              data-cy="titleInput"
              value={title}
              onChange={handleTitleChange}
            />
          </label>

          {isFormSubmitted && !isTitleValid && (
            <span className="error">
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <label htmlFor="todoUser">
            {'User: '}
            <select
              id="todoUser"
              data-cy="userSelect"
              value={userId}
              onChange={handleUserIdChange}
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

            {isFormSubmitted && !isUserIdValid && (
              <span className="error">
                Please choose a user
              </span>
            )}
          </label>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
