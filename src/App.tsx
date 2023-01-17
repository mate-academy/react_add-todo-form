import './App.scss';
import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

function getUser(userId: number) {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const newTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

let maxId = Math.max(...newTodos.map(todo => todo.id));

export const App: React.FC = () => {
  const [activeUser, setActiveUser] = useState(0);
  const [message, setMessage] = useState('');
  const [visibleTodos, setVisibleTodos] = useState(newTodos);
  const [hasMessageError, setHasMessageError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const newTodo = () => {
    maxId += 1;

    return {
      id: maxId,
      title: message,
      completed: false,
      userId: activeUser,
      user: getUser(activeUser),
    };
  };

  const handleAdd = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasMessageError(!message);
    setHasUserError(!activeUser);

    if (message && activeUser) {
      const updatedTodo = newTodo();

      setVisibleTodos([
        ...visibleTodos,
        updatedTodo,
      ]);
    }

    setMessage('');
    setActiveUser(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="Get" onSubmit={handleAdd}>
        <div className="field">
          <span>Title: </span>
          <input
            placeholder="Enter a title"
            type="text"
            data-cy="titleInput"
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
            }}
          />
          {hasMessageError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <span>User: </span>

          <select
            data-cy="userSelect"
            value={activeUser}
            onChange={(event) => {
              setActiveUser(+event.target.value);
            }}
          >
            <option
              value="0"
              disabled
            >
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          {hasUserError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
