import './App.scss';
import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { User } from './types/User';

function getUserById(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [isError, setIsError] = useState(true);
  const [userId, setUserId] = useState(0);
  const [isUserChosen, setIsUserChosen] = useState(true);
  const [visibilityTodos, setVisibilityTodos] = useState(todos);

  const largestTodosId = Math.max(...visibilityTodos.map(todo => todo.id)) + 1;

  const addTodo = (id: number) => {
    if (getUserById(id) && title.trim()) {
      const userToCreate = {
        id: largestTodosId,
        userId,
        title,
        completed: false,
        user: getUserById(userId),
      };

      setVisibilityTodos(prevTodos => {
        return [
          ...prevTodos,
          userToCreate,
        ];
      });

      setTitle('');
      setUserId(0);
    }

    if (!userId) {
      setUserId(0);
      setIsUserChosen(false);
    }

    if (!title.trim()) {
      setIsError(false);
    }
  };

  const handlerUserValue = (event: React.ChangeEvent<HTMLSelectElement>
  | React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.tagName) {
      case 'INPUT':
        setTitle(event.target.value);
        setIsError(true);
        break;

      case 'SELECT':
        setUserId(+event.target.value);
        setIsUserChosen(true);
        break;

      default:
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => {
          event.preventDefault();
          addTodo(userId);
        }}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            data-cy="titleInput"
            name="title"
            placeholder="Enter a title"
            value={title}
            onChange={(event) => {
              handlerUserValue(event);
            }}
          />
          {!isError && (
            <span className="error">Please enter a title</span>
          )}

        </div>

        <div className="field">
          <label htmlFor="user">User: </label>

          <select
            data-cy="userSelect"
            id="user"
            value={userId}
            onChange={(event) => {
              handlerUserValue(event);
            }}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(({ id, name }) => (
              <option key={id} value={id}>{name}</option>
            ))}
          </select>
          {!isUserChosen && (
            <span className="error">Please choose a user</span>
          )}

        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={visibilityTodos} />
      </section>
    </div>
  );
};
