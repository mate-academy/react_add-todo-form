import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

const todosWithUsers = todosFromServer.map(todo => {
  const user = usersFromServer.find(userr => userr.id === todo.userId);

  return {
    ...todo,
    user,
  };
});

export const App = () => {
  const [todos, setTodos] = useState(todosWithUsers);
  const [title, setTitle] = useState('');
  const [user, setUser] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => {
          event.preventDefault();
          if (title && user) {
            const maxIndex = Math.max(...todos.map(todo => todo.id)) + 1;
            const newTodo = {
              id: maxIndex,
              title,
              completed: false,
              userId: +user,
              user: usersFromServer.find(userr => userr.id === +user),
            };

            setTitle('');
            setUser('');

            setTodos([...todos, newTodo]);
          } else if (!title && !user) {
            setTitleError(true);
            setUserError(true);
          } else if (!title) {
            setTitleError(true);
          } else {
            setUserError(true);
          }
        }}
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
            placeholder="Enter a title"
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={user}
            onChange={(e) => {
              setUser(e.target.value);
              setUserError(false);
            }}
          >
            <option value="" disabled>Choose a user</option>
            {usersFromServer.map(userr => (
              <option value={userr.id}>{userr.name}</option>
            ))}
          </select>

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
