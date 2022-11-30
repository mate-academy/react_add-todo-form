import React, { useState } from 'react';

import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/ToDO';

import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [completed] = useState(false);
  const [isTitleEntered, setIsTitleEntered] = useState(true);
  const [isUserSelected, setIsUserSelected] = useState(true);
  const [visibleTodos, setVisibleTodos] = useState(todos);

  const addTodo = (id: number) => {
    const user = getUser(userId);
    const maxTodoId = Math.max(...todos.map(todo => todo.id)) + 1;

    if (!title) {
      setIsTitleEntered(false);
    }

    if (!user) {
      setIsUserSelected(false);
    }

    if (user && title) {
      const newTodo = {
        id: maxTodoId,
        userId: id,
        title,
        completed,
        user,
      };

      setVisibleTodos(current => ([
        ...current,
        newTodo,
      ]));

      setTitle('');
      setUserId(0);
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitleEntered(true);
  };

  const handleUserSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setIsUserSelected(true);
  };

  const handleFormSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTodo(userId);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form method="POST" onSubmit={handleFormSubmit}>
        <div className="field">
          Title:
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />

          {!isTitleEntered && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          User:
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUserSelection}
          >
            <option value="0" disabled selected>Choose a user</option>
            {usersFromServer.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {!isUserSelected && (
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
