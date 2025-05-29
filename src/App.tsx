import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo, TodoWithUser, User } from './types';
import { TodoList } from './components/TodoList';
import React, { useState } from 'react';

const getUserById = (userId: number): User | null => {
  return usersFromServer.find(user => user.id === userId) ?? null;
};

const initialTodos: TodoWithUser[] = todosFromServer.map(
  (todo: Todo): TodoWithUser => {
    return {
      ...todo,
      user: getUserById(todo.userId),
    };
  },
);

function getNewTodoId(todos: TodoWithUser[]) {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}

export const App = () => {
  const [todosWithUsers, setTodoWithUsers] =
    useState<TodoWithUser[]>(initialTodos);

  const [selectedUserId, setSelectedUserId] = useState(0);
  const [hasSelectedUserIdError, setHasSelectedUserIdError] = useState(false);

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const allowedChars = /[^a-zA-Zа-яА-Я0-9\s]/g;

    const filteredValue = inputValue.replace(allowedChars, '');

    setTitle(filteredValue);
    setHasTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
    setHasSelectedUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isTitleEmpty = title.trim() === '';
    const isUserNotSelected = selectedUserId === 0;

    setHasTitleError(isTitleEmpty);
    setHasSelectedUserIdError(isUserNotSelected);

    if (isTitleEmpty || isUserNotSelected) {
      return;
    }

    const idTodo = getNewTodoId(todosWithUsers);

    const newTodo: TodoWithUser = {
      id: idTodo,
      title: title,
      completed: false,
      userId: selectedUserId,
      user: getUserById(selectedUserId),
    };

    setTodoWithUsers(currentTodosWithUser => {
      return [...currentTodosWithUser, newTodo];
    });

    setTitle('');
    setSelectedUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="todo-title">Title:&nbsp;</label>
          <input
            type="text"
            id="todo-title"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />

          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user-select">User:&nbsp;</label>
          <select
            id="user-select"
            value={selectedUserId}
            onChange={handleUserIdChange}
            data-cy="userSelect"
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasSelectedUserIdError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todosWithUsers} />
    </div>
  );
};
