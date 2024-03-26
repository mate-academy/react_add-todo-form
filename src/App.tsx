import React, { useState } from 'react';
import './App.scss';

import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { User } from './types/User';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const specialCharsPattern = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g; //pattern that matches special chars only

function getUserByUserId(userId: number) {
  return usersFromServer.find(user => user.id === userId);
}

function getPreparedTodos() {
  const preparedTodos = todosFromServer.map(todo => ({
    ...todo,
    user: getUserByUserId(todo.userId),
  }));

  return preparedTodos;
}

export const App: React.FC = () => {
  const [visibleTodos, setVisibleTodos] = useState(getPreparedTodos());
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleError, setTitleError] = useState('');
  const [userIdError, setUserIdError] = useState('');

  function getLargestTodoId() {
    const sortedById = [...visibleTodos].sort(
      (todo1, todo2) => todo2.id - todo1.id,
    );

    return sortedById[0].id + 1;
  }

  function titleValidation() {
    return title.replaceAll(specialCharsPattern, '');
  }

  function reset() {
    setTitle('');
    setUserId(0);
  }

  function addNewTodo(newTodo: Todo) {
    setVisibleTodos(prevTodos => [...prevTodos, newTodo]);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!title) {
      setTitleError('Please enter a title');
    }

    if (!userId) {
      setUserIdError('Please choose a user');
    }

    if (!title || !userId) {
      return;
    }

    addNewTodo({
      id: getLargestTodoId(),
      title: titleValidation(),
      completed: false,
      userId,
      user: getUserByUserId(userId) as User,
    });

    reset();
  }

  function handleTitle(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
    setTitleError('');
  }

  function handleUser(event: React.ChangeEvent<HTMLSelectElement>) {
    setUserId(Number(event.target.value));
    setUserIdError('');
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={event => handleSubmit(event)}
      >
        <div className="field">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            placeholder="Enter a title"
            value={title}
            data-cy="titleInput"
            onChange={handleTitle}
          />
          {titleError && <span className="error">{titleError}</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User:</label>
          <select
            id="user"
            value={userId}
            data-cy="userSelect"
            onChange={handleUser}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => {
              return (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>

          {userIdError && <span className="error">{userIdError}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos as Todo[]} />
    </div>
  );
};
