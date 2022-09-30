import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

const todoid = todos.map(todo => todo.id);
let maxTodoid = Math.max(...todoid);

export const App = () => {
  const [userId, setUserId] = useState(0);
  const [isUserChose, setIsUserChose] = useState(true);
  const [title, setTitle] = useState('');
  const [isTitleChose, setIsTitleChose] = useState(true);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitleChose(true);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
    setIsUserChose(true);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!userId) {
      setIsUserChose(false);
    }

    if (!title.trim()) {
      setIsTitleChose(false);
    }

    if (!userId || !title.trim()) {
      return;
    }

    maxTodoid += 1;

    const newTodo:Todo = {
      id: maxTodoid,
      userId,
      title,
      completed: false,
      user: getUser(userId),
    };

    todos.push(newTodo);

    setUserId(0);
    setTitle('');
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
            <span>{'Title: '}</span>
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleTitleChange}
            />
            {
              isTitleChose
              || <span className="error">Please enter a title</span>
            }
          </label>
        </div>

        <div className="field">
          <label>
            <span>{'User: '}</span>
            <select
              data-cy="userSelect"
              defaultValue={userId}
              value={userId}
              onChange={handleUserChange}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>{user.name}</option>
              ))}
            </select>
          </label>

          {isUserChose || <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
