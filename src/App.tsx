import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todo } from './types/Todo';

function getUser(userId:number): User | null {
  return usersFromServer
    .find(user => userId === user.id) || null;
}

function getValidId(todos: Todo[]): number {
  const existingIds = todos.map(todo => todo.id);
  let newId = 1;

  while (existingIds.includes(newId)) {
    newId += 1;
  }

  return newId;
}

const todosWithUser: Todo[] = todosFromServer
  .map(todo => ({
    ...todo,
    user: getUser(todo.userId),
  }));

/* eslint-disable no-console */
export const App = () => {
  const [todos, setTodos] = useState(todosWithUser);
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState(0);

  console.log('here is the todos:', todos);
  console.log('here is the title:', title);
  console.log('here is the user:', selectedUser);

  const handleUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(+event.currentTarget.value);
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.currentTarget.value;

    setTitle(newTitle);
  };

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newtitle = title.trim();

    const newTodo = {
      id: getValidId(todos),
      userId: selectedUser,
      title: newtitle,
      completed: false,
      user: getUser(selectedUser),
    };

    setTodos((prevTodos) => ([
      ...prevTodos,
      newTodo,
    ]));
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmitForm}
      >
        <div className="field">
          <label>
            {'Title: '}

            <input
              type="text"
              data-cy="titleInput"
              placeholder="What user must to do..."
              value={title}
              onChange={handleTitle}
            />
          </label>

          <span className="error">
            Please enter a title
          </span>
        </div>

        <div className="field">
          <label>
            {'User: '}

            <select
              data-cy="userSelect"
              value={selectedUser}
              onChange={handleUser}
            >
              <option
                value="0"
                disabled
              >
                Choose a user
              </option>

              {usersFromServer.map(({ id, name }) => (
                <option value={id} key={id}>
                  {name}
                </option>
              ))}
            </select>
          </label>

          <span className="error">
            Please choose a user
          </span>
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
