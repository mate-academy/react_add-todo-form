import React, { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { User } from './components/types/User';
import { Todo } from './components/types/Todo';

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
  const [list, setList] = useState(todos);
  const [input, setInput] = useState('');
  const [userId, setUserId] = useState('');

  const addTodo = (event: any) => {
    event.preventDefault();
    const newTodo : Todo = {
      id: Math.floor(Math.random() * 100),
      userId: +userId,
      title: input,
      completed: false,
      user: getUser(+userId),
    };

    setList((prevState) => [...prevState, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST" onSubmit={addTodo}>
        <div className="field">
          Title:
          <input
            type="text"
            data-cy="titleInput"
            onChange={event => setInput(event.target.value)}
          />
          <span
            className="error"
            style={{ display: input === '' ? 'inline' : 'none' }}
          >
            Please enter a title
          </span>
        </div>

        <div className="field">
          User:
          <select
            data-cy="userSelect"
            onChange={event => {
              setUserId(event.target.value);
            }}
          >
            <option value="0" selected disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id}>{user.name}</option>
            ))}
          </select>

          <span
            className="error"
            style={{ display: userId === '' ? 'inline' : 'none' }}
          >
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

      <section className="TodoList">
        <TodoList todos={list} />
      </section>
    </div>
  );
};
