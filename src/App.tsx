import React, { useState } from 'react';

import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { TodoList } from './components/TodoList';

const getUserById = (userId: number) =>
  usersFromServer.find(user => user.id === userId) as User;

const todosWithUsers: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(todosWithUsers);
  const [userID, setUserID] = useState(0);
  const [todoTitle, setTodoTitle] = useState('');
  const [errorTitle, setErrorTitle] = useState('');
  const [errorID, setErrorID] = useState('');

  const addTodo = (newTodo: Todo) => {
    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  const createNewId = () => Math.max(...todos.map(todo => todo.id)) + 1;

  const resetFields = () => {
    setTodoTitle('');
    setUserID(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!todoTitle) {
      setErrorTitle('Please enter a title');
    }

    if (!userID) {
      setErrorID('Please choose a user');
    }

    if (!todoTitle || !userID) {
      return;
    }

    addTodo({
      id: createNewId(),
      title: todoTitle,
      completed: false,
      userId: userID,
      user: getUserById(userID),
    });

    resetFields();
  };

  const handleAddTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorTitle('');
    setTodoTitle(event.target.value);
  };

  const handleSelectUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setErrorID('');
    setUserID(Number(event.target.value));
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title: </label>

          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={todoTitle}
            onChange={handleAddTitle}
          />

          {errorTitle && <span className="error">{errorTitle}</span>}
        </div>

        <div className="field">
          <label htmlFor="user-id">User: </label>

          <select
            id="user-id"
            data-cy="userSelect"
            value={userID}
            onChange={handleSelectUser}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map((user: User) => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {errorID && <span className="error">{errorID}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
