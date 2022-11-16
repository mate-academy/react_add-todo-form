import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function findUserById(userId: number): User | undefined {
  return usersFromServer.find(
    (user) => (user.id === userId),
  );
}

const todos: Todo[] = todosFromServer.map(
  (todo) => ({
    ...todo,
    user: findUserById(todo.userId),
  }),
);

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [visibleTodos, setVisibleTodos] = useState(todos);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setTitleError(title.trim().length === 0);
    setUserError(userId === 0);

    if (title.trim().length && userId) {
      setVisibleTodos((prevState) => {
        const newTodo: Todo = {
          id: (Math.max(...prevState.map(p => p.id)) + 1),
          completed: false,
          userId,
          title,
          user: findUserById(userId),
        };

        return [
          ...prevState,
          newTodo,
        ];
      });

      setTitle('');
      setUserId(0);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        onSubmit={handleSubmit}
        method="POST"
      >
        <div className="field">
          <label htmlFor="title">
            {'Title: '}
          </label>

          <input
            type="text"
            data-cy="titleInput"
            name="title"
            value={title}
            onChange={
              (event) => {
                setTitle(event.target.value);
                setTitleError(event.target.value.trim().length === 0);
              }
            }
            placeholder="Please enter a title"
          />

          {
            titleError
            && <span className="error">Please enter a title</span>
          }
        </div>

        <div className="field">
          <label htmlFor="user">
            {'User: '}
          </label>
          <select
            data-cy="userSelect"
            name="user"
            value={userId}
            onChange={(event) => {
              setUserId(parseInt(event.target.value, 10));
              setUserError(parseInt(event.target.value, 10) === 0);
            }}
          >
            <option value="0" disabled>Choose a user</option>
            {
              usersFromServer.map(
                (userOption) => (
                  <option value={userOption.id} key={userOption.id}>
                    {userOption.name}
                  </option>
                ),
              )
            }
          </select>

          {
            userError
            && <span className="error">Please choose a user</span>
          }
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
