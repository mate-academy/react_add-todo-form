import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import React, { useState } from 'react';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User | null;
}

export const getUserById = (userId: number): User | null => {
  return usersFromServer.find(user => user.id === userId) || null;
};

const initialTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

const getNewTodoId = (todos: Todo[]) => {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
};

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [title, setTitle] = useState('');
  const [tileError, setTitleError] = useState(false);
  const [selectUser, setSelectUser] = useState(0);
  const [selectUserError, setSelectUserError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectUser(+event.target.value);
    setSelectUserError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isButtonDisabled = !title || !selectUser;

    if (isButtonDisabled) {
      setTitleError(!title);
      setSelectUserError(!selectUser);

      return;
    }

    const user = getUserById(selectUser);

    const newTodo: Todo = {
      id: getNewTodoId(todos),
      title,
      completed: false,
      userId: selectUser,
      user,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
    setTitle('');
    setSelectUser(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label className="label" htmlFor="title">
            Title:
          </label>
          <input
            type="text"
            data-cy="titleInput"
            id="title"
            value={title}
            placeholder="Enter your title"
            onChange={handleTitleChange}
          />
          {tileError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label className="label" htmlFor="user">
            User:
          </label>
          <select
            data-cy="userSelect"
            id="user"
            value={selectUser}
            onChange={handleSelectChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
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
