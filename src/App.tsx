import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import React, { useState } from 'react';
import { Todo } from './types/todo';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const todos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const initialUsers = [...usersFromServer];
  const [currentTodos, setTodos] = useState<Todo[]>(todos);

  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState('0');
  const [buttonWasPressed, setButtonWasPressed] = useState(false);

  const addNewTodo = (newTodo: Todo) => {
    setTodos(actualTodos => [...actualTodos, newTodo]);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title || selectedUser === '0') {
      setButtonWasPressed(true);

      return;
    }

    addNewTodo({
      id: Math.max(...currentTodos.map(todo => todo.id)) + 1,
      title,
      completed: false,
      userId: Number(selectedUser),
      user: getUserById(Number(selectedUser)),
    });
    setTitle('');
    setSelectedUser('0');
    setButtonWasPressed(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">
            Title:
            <input
              type="text"
              id="title"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={ev => setTitle(ev.target.value)}
            />
          </label>
          {buttonWasPressed && !title && (
            <span className="error" data-cy="titleError">
              Please enter a title
            </span>
          )}
        </div>
        <div className="field">
          <label htmlFor="user">
            User:
            <select
              data-cy="userSelect"
              id="user"
              value={selectedUser}
              onChange={ev => setSelectedUser(ev.target.value)}
            >
              <option value="0" disabled={!selectedUser ? false : true}>
                Choose a user
              </option>
              {initialUsers.map(user => {
                return (
                  <option value={user.id} key={user.id}>
                    {user.name}
                  </option>
                );
              })}
            </select>
          </label>
          {buttonWasPressed && selectedUser === '0' && (
            <span className="error" data-cy="userError">
              Please choose a user
            </span>
          )}
        </div>
        <button
          type="submit"
          data-cy="submitButton"
          onClick={() => {
            setButtonWasPressed(true);
          }}
        >
          Add
        </button>
      </form>

      <TodoList todos={currentTodos} />
    </div>
  );
};
