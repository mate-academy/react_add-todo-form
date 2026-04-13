import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodosWithUsers, User } from './types';
import { TodoList } from './components/TodoList';
import React, { useState } from 'react';

const initialTodos: TodosWithUsers[] = todosFromServer.map(todo => {
  const user = usersFromServer.find(foundUser => foundUser.id === todo.userId);

  if (!user) {
    throw new Error(`User not found for todo ${todo.id}`);
  }

  return {
    ...todo,
    user,
  };
});

export const App = () => {
  const [todos, setTodos] = useState<TodosWithUsers[]>(initialTodos);

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [selectedUserId, setSelectedUserId] = useState('');
  const [hasUserError, setHasUserError] = useState(false);

  const getUniqueId = () => {
    if (todos.length === 0) {
      return 0;
    }

    const todoIds = todos.map(todo => todo.id);

    return Math.max(...todoIds) + 1;
  };

  const addTodoToList = () => {
    const selectUser = usersFromServer.find(
      user => user.id === +selectedUserId,
    );

    if (!selectUser) {
      throw new Error(`User not found ${selectedUserId}`);
    }

    const newTodo: TodosWithUsers = {
      id: getUniqueId(),
      title: title,
      completed: false,
      userId: +selectedUserId,
      user: selectUser,
    };

    setTodos(currTodos => [...currTodos, newTodo]);
  };

  const handleUserChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    setSelectedUserId(event.target.value);
    if (hasUserError) {
      setHasUserError(false);
    }
  };

  const reset = () => {
    setTitle('');
    setSelectedUserId('');
    setHasTitleError(false);
    setHasUserError(false);
  };

  const handleTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setTitle(event.target.value);
    if (hasTitleError) {
      setHasTitleError(false);
    }
  };

  const onSumbit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserError(!selectedUserId);

    if (!title || !selectedUserId) {
      return;
    }

    addTodoToList();
    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={onSumbit}>
        <div className="field">
          <label htmlFor="title-input">Title: </label>
          <input
            id="title-input"
            type="text"
            data-cy="titleInput"
            placeholder="Enter todo title"
            value={title}
            onChange={handleTitleChange}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user-select">User: </label>
          <select
            id="user-select"
            data-cy="userSelect"
            value={selectedUserId}
            onChange={handleUserChange}
          >
            <option value="">Choose a user</option>
            {usersFromServer.map((user: User) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {hasUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
