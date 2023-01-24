// import React, { useState } from 'react';
import './App.scss';
import { useEffect, useState } from 'react';
import { Todo } from './Types/Todo';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './Types/User';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const App: React.FC = () => {
  const visibleUsers = [...usersFromServer];
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completed, setCompleted] = useState(false);
  const [tittleError, setTittleError] = useState(false);
  const [selectedError, setSelectedError] = useState(false);

  useEffect(() => {
    setTodos(todosFromServer.map(todo => ({
      ...todo,
      user: getUser(todo.userId),
    })));
  }, []);

  const reset = () => {
    setTitle('');
    setCompleted(false);
    setSelectedUser(0);
    setSelectedError(false);
    setTittleError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTittleError(!title);
    setSelectedError(!selectedUser);

    // if (!title) {
    //   setTittleError(true);
    // }

    // if (!selectedUser) {
    //   setSelectedError(true);
    // }

    if (!title || !selectedUser) {
      return;
    }

    setTodos((prev) => {
      const todo = {
        title,
        userId: (selectedUser),
        completed,
        user: getUser(selectedUser),
        id: Math.max(...prev.map(item => item.id)) + 1,
      };

      return (
        [...prev, todo]
      );
    });

    reset();
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
          <span className="field__text">Title:</span>
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              setTittleError(false);
            }}
          />
          {tittleError
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label
            className="field__text"
            htmlFor="completed"
          >
            Completed:
          </label>
          <input
            type="checkbox"
            data-cy="completed"
            id="completed"
            checked={completed}
            onChange={() => {
              setCompleted((state) => !state);
            }}
          />
        </div>

        <div className="field">
          <span className="field__text">User:</span>
          <select
            data-cy="userSelect"
            value={selectedUser}
            onChange={(event) => {
              setSelectedUser(Number(event.target.value));
              setSelectedError(false);
            }}
          >
            <option value="0" disabled>Choose a user</option>
            {visibleUsers.map((person) => (
              <option value={person.id} key={person.id}>
                {person.name}
              </option>
            ))}
          </select>
          {selectedError && (
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

      <TodoList todos={todos} />
    </div>
  );
};
