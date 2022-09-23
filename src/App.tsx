import React, { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const maxId = Math.max(...usersFromServer.map(user => user.id));

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [title, settitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleAddUser = (event: React.FormEvent) => {
    event.preventDefault();

    if (userId === 0) {
      setUserError(true);

      return;
    }

    if (title === '') {
      setTitleError(true);

      return;
    }

    const newTodo = {
      title,
      id: maxId + 1,
      userId,
      completed: false,
      user: getUser(userId),
    };

    todos.push(newTodo);

    settitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1 className="App__title">Add todo form</h1>
      <form
        action="/api/users"
        onSubmit={handleAddUser}
      >
        Title:
        <input
          data-cy="titleInput"
          type="text"
          placeholder="Enter a title"
          value={title}
          onChange={(event) => {
            settitle(event.target.value);
            setTitleError(false);
          }}
        />
        {titleError && <span className="error">Please enter a title</span>}
        <br />
        User:
        <select
          data-cy="userSelect"
          name="user"
          value={userId}
          onChange={(event) => {
            setUserId(Number(event.target.value));
            setUserError(false);
          }}
        >
          {userError && <span className="error">Please choose a user</span>}
          <option
            value="0"
            disabled
          >
            Сhoose a user
          </option>
          {usersFromServer.map(({ id, name }) => (
            <option
              value={id}
            >
              {name}
            </option>
          ))}

        </select>
        <br />
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
