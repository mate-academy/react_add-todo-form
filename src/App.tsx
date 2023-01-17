import React, { FormEvent, useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';

import { TodoList } from './components/TodoList/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userId, setUserId] = useState(0);
  const [userError, setUserError] = useState(false);

  const newTodos = () => {
    const newTodo = {
      id: [...todos.sort((a, b) => b.id - a.id)][0].id + 1,
      userId: +userId,
      title,
      completed: false,
      user: getUser(userId),
    };

    todos.push(newTodo);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      setTitleError(true);
    }

    if (!userId) {
      setUserError(true);
    }

    if (!title.trim() || !userId) {
      return;
    }

    newTodos();
    setTitle('');
    setTitleError(false);
    setUserId(0);
    setUserError(false);
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
          <label>
            <span>Title: </span>
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Please enter a title"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
                setTitleError(false);
              }}
            />
          </label>

          {
            titleError && (
              <span className="error">Please enter a title</span>
            )
          }
        </div>

        <div className="field">
          <label>
            <span>User: </span>
            <select
              data-cy="userSelect"
              value={userId}
              onChange={(event) => {
                setUserId(+event.target.value);
                setUserError(false);
              }}
            >
              <option value="0" disabled>Choose a user</option>
              {
                usersFromServer.map(user => (
                  <option value={user.id} key={user.id}>{user.name}</option>
                ))
              }
            </select>
          </label>

          {
            userError && (
              <span className="error">Please choose a user</span>
            )
          }
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
