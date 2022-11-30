import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [visibleTodos, setVisibleTodos] = useState(todos);
  const [isTitleEntered, setisTitleEntered] = useState(true);
  const [isUserChoosed, setisUserChoosed] = useState(true);

  const getTodoId = Math.max(...visibleTodos.map(todo => todo.id)) + 1;

  const addTodo = (id: number) => {
    if (getUserById(id) && title.trim()) {
      const foundedUser = {
        id: getTodoId,
        userId,
        title,
        completed: false,
        user: getUserById(userId),
      };

      setVisibleTodos(prevTodos => {
        return [
          ...prevTodos,
          foundedUser,
        ];
      });

      setUserId(0);
      setTitle('');
    }

    if (!title.trim()) {
      setisTitleEntered(false);
    }

    if (!userId) {
      setUserId(0);
      setisUserChoosed(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTodo(userId);
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
          <label htmlFor="titleInput">Title: </label>

          <input
            type="text"
            data-cy="titleInput"
            id="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              setisTitleEntered(true);
            }}
          />

          {!isTitleEntered && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>

          <select
            data-cy="userSelect"
            id="userSelect"
            value={userId}
            onChange={(event) => {
              setUserId(+event.target.value);
              setisUserChoosed(true);
            }}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {!isUserChoosed && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
