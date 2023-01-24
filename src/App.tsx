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

const todosWithUser = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

const getNewId = (array: { id: number }[]) => (
  Math.max(...array.map(todo => todo.id)) + 1
);

export const App = () => {
  const [todos, setTodos] = useState(todosWithUser);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [enteredTitle, setEnteredTitle] = useState('');
  const [selectUserError, setSelectUserError] = useState(false);
  const [enteredTitleError, setEnteredTitleError] = useState(false);

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.currentTarget.value);
    if (selectUserError) {
      setSelectUserError(false);
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredTitle(event.currentTarget.value);
    if (enteredTitleError) {
      setEnteredTitleError(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!enteredTitle || !selectedUserId) {
      setEnteredTitleError(!enteredTitle);
      setSelectUserError(!selectedUserId);

      return;
    }

    setTodos(prevTodos => {
      const newTodo: Todo = {
        id: getNewId(prevTodos),
        title: enteredTitle.trim(),
        completed: false,
        userId: selectedUserId,
        user: getUserById(selectedUserId),
      };

      return ([...prevTodos, newTodo]);
    });

    setEnteredTitle('');
    setSelectedUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
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
            <option value="0">Choose a user</option>

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
