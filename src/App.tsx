import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

function createTodo(
  titleTodo: string,
  nameUser: string,
  users: User[],
  todosList: Todo[],
) {
  const foundUser: User | undefined = users
    .find(user => user.name === nameUser);

  if (!foundUser) {
    throw new Error(`User '${nameUser}' not found.`);
  }

  const todoMaxId = todosList.reduce((prev, curr) => {
    return prev.id > curr.id ? prev : curr;
  });

  return {
    id: todoMaxId.id + 1,
    title: titleTodo,
    completed: false,
    userId: foundUser.id,
    user: foundUser,
  };
}

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [initialTodos, setInitialTodos] = useState([...todos]);

  const [titleError, setTitleError] = useState(false);
  const [nameError, setNameError] = useState(false);

  const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim()) {
      setNameError(true);
    }

    if (!title) {
      setTitleError(true);
    } else {
      const newTodo = createTodo(
        title,
        name,
        usersFromServer,
        initialTodos,
      );

      setName('');
      setTitle('');
      setNameError(false);
      setTitleError(false);

      setInitialTodos([...initialTodos, newTodo]);
    }
  };

  const titleHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
    setTitleError(false);
  };

  const nameHandler = (event: React.FormEvent<HTMLSelectElement>) => {
    setName(event.currentTarget.value);
    setNameError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => {
          handleAddTodo(event);
        }}
      >
        <div className="field">
          <input
            type="text"
            name="title"
            data-cy="titleInput"
            value={title}
            placeholder="Enter a title"
            onChange={(event) => {
              titleHandler(event);
            }}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            name="name"
            value={name}
            onChange={(event) => nameHandler(event)}
          >
            <option value="" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>

          {nameError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={initialTodos} />
    </div>
  );
};
