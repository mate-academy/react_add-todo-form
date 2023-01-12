import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const getUserById = (userId: number): User | null => (
  usersFromServer.find(user => user.id === userId) || null
);

const theBiggestTodoId = (todos: Todo[]) => {
  return Math.max(...todos.map(todo => todo.id));
};

const todosWithUser = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(todosWithUser);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [enteredTitle, setenteredTitle] = useState('');
  const [selectUserError, setSelectUserError] = useState(false);
  const [enteredTitleError, setEnteredTitleError] = useState(false);

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(event.currentTarget.value);
    setSelectUserError(false);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setenteredTitle(event.currentTarget.value.trim());
    setEnteredTitleError(false);
  };

  const handleSubmit = (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();

    setEnteredTitleError(!enteredTitle);
    setSelectUserError(!selectedUserId);

    if (enteredTitle && selectedUserId) {
      setTodos(currentTodos => {
        return [
          ...currentTodos,
          {
            id: theBiggestTodoId(todos) + 1,
            title: enteredTitle,
            completed: false,
            userId: +selectedUserId,
            user: getUserById(+selectedUserId),
          },
        ];
      });
    }

    setenteredTitle('');
    setSelectedUserId('');
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
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={enteredTitle}
            onChange={handleTitleChange}
          />
          {enteredTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            data-cy="userSelect"
            name="user"
            value={selectedUserId}
            onChange={handleUserChange}
          >
            <option value="" disabled>Choose a user</option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>))}
          </select>
          {selectUserError && (
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
