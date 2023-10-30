import './App.scss';
import { useState } from 'react';

import { TodoList } from './components/TodoList';
import { Todo } from './types';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId)
    || null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [currentTodos, setCurrentTodos] = useState(todos);
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userId, setUserId] = useState(0);
  const [userError, setUserError] = useState(false);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) {
      setTitleError(true);
    }

    if (!userId) {
      setUserError(true);
    }

    if (title && userId) {
      const newTodo = {
        id: Math.max(...currentTodos.map(todo => todo.id)) + 1,
        title,
        completed: false,
        userId,
        user: getUserById(userId),
      };

      setCurrentTodos(prevTodos => [...prevTodos, newTodo]);

      setTitle('');
      setTitleError(false);
      setUserId(0);
      setUserError(false);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={submitHandler}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              setTitleError(false);
            }}
            required
          />

          {titleError
            && (<span className="error">Please enter a title</span>)}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            defaultValue="0"
            onChange={event => {
              setUserId(+event.target.value);
              setUserError(false);
            }}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {userError
            && (<span className="error">Please choose a user</span>)}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={currentTodos} />
    </div>
  );
};
