import './App.scss';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from '../src/index';
import { useState } from 'react';

function getUserById(userId: number) {
  return usersFromServer.find(user => userId === user.id) || null;
}

const users: User[] = [...usersFromServer];
const todos = todosFromServer.map(todo => ({
  user: getUserById(todo.userId),
  ...todo,
}));

export const App = () => {
  const [visibleTodos, setVisibleTodos] = useState(todos);
  const [title, setTitle] = useState('');
  const [user, setUser] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const onSubmit = () => {
    if (!title) {
      setTitleError(true);
    }

    if (user === 0) {
      setUserError(true);
    }

    if (!title || user === 0) {
      return;
    }

    const newId = Math.max(...visibleTodos.map(todo => todo.id), 0) + 1;

    setVisibleTodos(prev => [
      ...prev,
      {
        user: getUserById(user),
        id: newId,
        title,
        completed: false,
        userId: user,
      },
    ]);

    setTitle('');
    setUser(0);
    setTitleError(false);
    setUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={event => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <div className="field">
          <label htmlFor="titleId">Title:</label>
          <input
            id="titleId"
            type="text"
            data-cy="titleInput"
            placeholder="Please enter a Title"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setTitleError(false);
            }}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelectId">User:</label>
          <select
            id="userSelectId"
            data-cy="userSelect"
            value={user}
            onChange={event => {
              setUser(+event.target.value);
              setUserError(false);
            }}
          >
            <option value={0} disabled>
              Choose a user
            </option>
            {users.map(u => (
              <option value={u.id} key={u.id}>
                {u.name}
              </option>
            ))}
          </select>

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={visibleTodos} />
    </div>
  );
};
