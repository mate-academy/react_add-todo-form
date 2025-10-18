import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import { Todo } from './types/typeTodo';
import { User } from './types/typeUser';
import { TodoUser } from './types/typeTodoWithUser';

function renderTodos(todos: Todo[], users: User[]): TodoUser[] {
  return todos
    .map(todo => {
      const currUser = users.find(user => user.id === todo.userId);

      return currUser ? { ...todo, user: currUser } : null;
    })
    .filter((t): t is TodoUser => t !== null);
}

export const App = () => {
  const todoArr = renderTodos(todosFromServer, usersFromServer);

  const [todos, setTodos] = useState(todoArr);

  const [currTitle, setCurrTitle] = useState('');
  const [errorTitle, setErrorTitle] = useState(false);

  const [currOption, setCurrOption] = useState(0);
  const [errorOption, setErrorOption] = useState(false);

  const handlTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrTitle(event.target.value);
    setErrorTitle(false);
  };

  const handlOptionCheng = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrOption(Number(event.target.value));
    setErrorOption(false);
  };

  const reset = () => {
    setCurrTitle('');
    setCurrOption(0);

    setErrorTitle(false);
    setErrorOption(false);
  };

  const newTodoId = () => Math.max(0, ...todos.map(todo => todo.id)) + 1;

  const newTodo = (): TodoUser => {
    const selectUser = usersFromServer.find(user => user.id === currOption);

    if (!selectUser) {
      throw new Error('User not found');
    }

    return {
      id: newTodoId(),
      title: currTitle,
      completed: false,
      userId: currOption,
      user: selectUser,
    };
  };

  const addNewTodo = (): void => {
    const creatTodo = newTodo();

    setTodos(currTodos => [...currTodos, creatTodo]);
  };

  const handlFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorTitle(!currTitle);
    setErrorOption(!currOption);

    if (!currTitle || !currOption) {
      return;
    }

    addNewTodo();
    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handlFormSubmit}>
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={currTitle}
            onChange={handlTitleChange}
          />
          {errorTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            id="user"
            data-cy="userSelect"
            value={currOption}
            onChange={handlOptionCheng}
          >
            <option value={0} disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {errorOption && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
