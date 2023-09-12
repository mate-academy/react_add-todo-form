import './App.scss';

import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { findUserById } from './components/helpers/findUserById';

const preparedTodos:Todo[] = todosFromServer.map((todo) => ({
  ...todo,
  user: findUserById(todo.userId),
}));

export const App = () => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(preparedTodos);

  const [todoTitle, setTodoTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const handleChangeTitle = (event:
  React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserIdSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const resetFields = () => {
    setTodoTitle('');
    setUserId(0);
    setHasUserIdError(false);
    setHasTitleError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!todoTitle);

    setHasUserIdError(!userId);

    if (!todoTitle || !userId) {
      return;
    }

    const newTodoId = Math.max(...visibleTodos.map(({ id }) => id)) + 1;

    setVisibleTodos((prevState) => [
      ...prevState,
      {
        id: newTodoId,
        title: todoTitle,
        completed: false,
        userId,
        user: findUserById(userId),
      },
    ]);

    resetFields();
  };

  const deleteTodo = (todoId: number) => {
    setVisibleTodos((prevState) => prevState
      .filter(({ id }) => id !== todoId));
  };

  const toggleTodoCompletion = (idTodo: number) => {
    setVisibleTodos((prevState) => {
      return prevState.map(todo => {
        if (todo.id === idTodo) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      });
    });
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        className="form__todo"
        onSubmit={handleSubmit}
        action="/api/todos"
        method="POST"
      >
        <div className="field">
          <input
            className="todo__title"
            type="text"
            data-cy="titleInput"
            value={todoTitle}
            onChange={handleChangeTitle}
            placeholder="write todo"
          />
          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUserIdSelect}
            className="select"
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map((user) => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>

          {hasUserIdError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          className="add__button"
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList
        deleteTodo={deleteTodo}
        todos={visibleTodos}
        toggleTodoCompletion={toggleTodoCompletion}
      />
    </div>
  );
};
