import './App.scss';
import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

const getNewId = (allTodos: Todo[]) => {
  const todoId = allTodos.map(todo => todo.id);

  return Math.max(...todoId) + 1;
};

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [newTodos, addNewTodos] = useState(todos);
  const [isError, setError] = useState(false);
  const [userId, setUserId] = useState(0);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title && userId) {
      const todo = {
        id: getNewId(newTodos),
        title,
        userId,
        completed: false,
        user: getUser(userId),
      };

      addNewTodos([...newTodos, todo]);
      setUserId(0);
      setTitle('');
      setError(false);
    } else {
      setError(true);
    }
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
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a tittle"
            name="title"
            value={title}
            onChange={(e) => {
              const { value } = e.target;

              setTitle(value);
            }}
          />
          {isError
            && !title
            && (
              <span className="error">Please enter a title</span>
            )}

        </div>

        <div className="field">
          <label htmlFor="">
            <select
              data-cy="userSelect"
              value={userId}
              onChange={(e) => setUserId(+(e.target.value))}
            >
              <option
                value="0"
                disabled
                selected
              >
                Choose a user
              </option>
              {usersFromServer.map(user => {
                return (
                  <option
                    value={user.id}
                    key={user.id}
                  >
                    {user.name}
                  </option>
                );
              })}

            </select>
          </label>
          {isError && !userId
            && (
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

      <TodoList todos={newTodos} />
    </div>
  );
};
