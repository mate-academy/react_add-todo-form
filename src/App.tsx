import './App.scss';

import React, { ChangeEvent, useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todos } from './components/TodoInfo';

function getUserById(userId: number) {
  return usersFromServer.find((user) => user.id === userId) || null;
}

export const todos = todosFromServer.map((todo) => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export function getMaxId(todo: Todos[]) {
  const maxId = Math.max(0, ...todo.map((item) => item.id));

  return maxId + 1;
}

const initialUserState = {
  id: 0,
  title: '',
  userId: 0,
  completed: false,
};

export const App = () => {
  const [newTodo, setNewTodo] = useState(initialUserState);

  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const [todo, setTodo] = useState<Todos[]>(todos);

  const userById = getUserById(newTodo.userId);

  const changeInput = (key: string, value: string | number) => {
    setNewTodo((prevUser) => ({ ...prevUser, [key]: value }));
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    changeInput('title', value);
    setHasTitleError(false);
  };

  const handleSelected = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    changeInput('userId', Number(value));
    setHasUserError(false);
  };

  const handleAddTodos = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedTitle = newTodo.title.trim();

    setHasTitleError(!trimmedTitle);
    setHasUserError(!newTodo.userId);

    if (!newTodo.userId || !trimmedTitle) {
      return;
    }

    const newTodoWithUser = {
      ...newTodo,
      id: getMaxId(todo),
      user: userById,
    };

    setTodo((prevTodos) => [...prevTodos, newTodoWithUser]);

    setNewTodo({
      id: 0,
      title: '',
      userId: 0,
      completed: false,
    });
  };

  return (
    <>
      <div className="App">
        <h1>Add todo form</h1>

        <form action="/api/todos" method="POST" onSubmit={handleAddTodos}>
          <div className="field">
            <label>
              Title:
              <input
                type="text"
                data-cy="titleInput"
                placeholder="Enter a title"
                value={newTodo.title}
                onChange={handleTitleChange}
              />
            </label>

            {hasTitleError && (
              <span className="error">Please enter a title</span>
            )}
          </div>

          <div className="field">
            <label htmlFor="chooseUser">User:</label>
            <select
              id="chooseUser"
              data-cy="userSelect"
              value={newTodo.userId}
              onChange={handleSelected}
            >
              <option value="0" disabled>
                Choose a user
              </option>
              {usersFromServer.map(({ id, name }) => (
                <option value={id} key={id}>
                  {name}
                </option>
              ))}
            </select>

            {hasUserError && (
              <span className="error">Please choose a user</span>
            )}
          </div>

          <button type="submit" data-cy="submitButton">
            Add
          </button>
        </form>

        <TodoList todos={todo} />
      </div>
    </>
  );
};
