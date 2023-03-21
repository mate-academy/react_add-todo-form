import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';

import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todosList: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

function findMax(todos: Todo[]): number {
  return Math.max(...todos.map((todo) => todo.id)) + 1;
}

export const App = () => {
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorUser, setErrorUser] = useState(false);
  const [title, setTitle] = useState('');
  const [userId, addUserId] = useState(0);
  const [todos, addTodos] = useState(todosList);

  const reset = () => {
    setTitle('');
    addUserId(0);
    setErrorTitle(false);
    setErrorUser(false);
  };

  const addTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userId && title.trim()) {
      const newTodo = {
        id: findMax(todos),
        title,
        completed: false,
        userId,
        user: getUser(userId),
      };

      addTodos([...todos, newTodo]);
      reset();
    }

    if (!userId) {
      setErrorUser(true);
    }

    if (!title.trim()) {
      setErrorTitle(true);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={addTodo}
      >
        <div className="field">
          <label htmlFor="titleInput">
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              id="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
                setErrorTitle(false);
              }}
            />
          </label>

          {errorTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">
            {'User: '}
            <select
              data-cy="userSelect"
              id="userSelect"
              value={userId}
              onChange={(event) => {
                addUserId(+event.target.value);
                setErrorUser(false);
              }}
            >
              <option value="0" disabled>Choose a user</option>

              {usersFromServer.map((user) => (
                <option
                  value={user.id}
                  key={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          {errorUser
           && (
             <span className="error">
               Please choose a user
             </span>
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
