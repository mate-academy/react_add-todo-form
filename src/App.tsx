import './App.scss';
import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { User } from './types/User';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [visibilityError, setVisibilityTheError] = useState(true);
  const [userId, setUserId] = useState(0);
  const [userChosen, setUserChosen] = useState(true);
  const [visibilityTodos, setVisibilityTodos] = useState(todos);

  const largestTodosId = Math.max(...visibilityTodos.map(todo => todo.id)) + 1;

  const addTodo = (id: number) => {
    if (getUser(id) && title.trim()) {
      const userToCreate = {
        id: largestTodosId,
        userId,
        title,
        completed: false,
        user: getUser(userId),
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
      setUserChosen(false);
    }

    if (!title.trim()) {
      setVisibilityTheError(false);
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
              setTitle(event.target.value);
              setVisibilityTheError(true);
            }}
          />
          {!visibilityError && (
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
              setUserId(+event.target.value);
              setUserChosen(true);
            }}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(({ id, name }) => (
              <option key={id} value={id}>{name}</option>
            ))}
          </select>
          {!userChosen && (
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
