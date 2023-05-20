import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find((user) => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map((todo) => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [title, setTitel] = useState('');
  const [userId, setUserId] = useState(0);
  const [newTodos, setNewTodos] = useState(todos);
  const [titleHasError, setTitleHasError] = useState(false);
  const [userHasError, setUserHasError] = useState(false);

  const addTodo = () => {
    if (userId && title) {
      const newId = Math.max(...newTodos.map(todo => todo.id)) + 1;
      const newTodo = {
        id: newId,
        userId,
        completed: false,
        title,
        user: getUser(userId),
      };

      if (title === ' ') {
        return;
      }

      setNewTodos((actualTodos) => ([...actualTodos, newTodo]));
      setUserId(0);
      setTitel('');
      setUserHasError(false);
      setTitleHasError(false);
    }

    if (!userId) {
      setUserHasError(true);
    }

    if (!title) {
      setTitleHasError(true);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo();
  };

  const handleUserId = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+e.target.value);
    setUserHasError(false);
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitel(e.target.value);
    setTitleHasError(false);
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
            pattern="^((?!\s{2}).)*$"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitle}
          />
          {titleHasError && (
            <span className="error">Please enter a title</span>)}

        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUserId}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(elem => (
              <option
                key={elem.id}
                value={elem.id}
              >
                {elem.name}
              </option>
            ))}
          </select>
          {userHasError && (
            <span className="error">Please choose a user</span>)}

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
