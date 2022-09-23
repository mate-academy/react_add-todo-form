import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import './App.scss';

import { Todo } from './types/Todo';
import { User } from './types/User';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

const copyTodos = [...todos];

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [wrongTitle, setWrongTitle] = useState(false);
  const [wrongUser, setWrongUser] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (userId === 0 || title === '') {
      setWrongTitle(title === '');
      setWrongUser(userId === 0);

      return;
    }

    const maxId = Math.max(...copyTodos.map((todo) => todo.id));

    const newTodo = {
      id: maxId + 1,
      title,
      userId,
      completed: false,
      user: getUser(userId),
    };

    copyTodos.push(newTodo);

    setTitle('');
    setUserId(0);
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setWrongTitle(false);
  };

  const handleUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+(event.target.value));
    setWrongUser(false);
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
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleTitle}
            />
          </label>

          {wrongTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={userId}
              onChange={handleUser}
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
          </label>

          {wrongUser && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={copyTodos} />
    </div>
  );
};
