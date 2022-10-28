import React, { FormEvent, useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

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

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value.replace(/[^\w\s\p{Script=Cyrillic}]/gui, ''));
    setTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
    setUserError(false);
  };

  const newTodos = () => {
    const maxId = Math.max(...todos.map(todo => todo.id));
    const newTodo = {
      id: maxId + 1,
      userId: Number(userId),
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
          <span>Title: </span>
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Please enter a title"
            value={title}
            onChange={handleTitleChange}
          />

          {
            titleError && (
              <span className="error">Please enter a title</span>
            )
          }
        </div>

        <div className="field">
          <span>User: </span>
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
          >
            <option value="0" disabled>Choose a user</option>
            {
              usersFromServer.map(user => (
                <option value={user.id} key={user.id}>{user.name}</option>
              ))
            }
          </select>

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
