import './App.scss';

import usersFromServer from './api/users';
import { useState } from 'react';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface TodoFromServer {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export interface Todos extends TodoFromServer {
  user: User;
}
export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [state, setState] = useState<TodoFromServer[]>(todosFromServer);
  const preparedTodos: Todos[] = state
    .map(todo => {
      const user = usersFromServer.find(users => users.id === todo.userId);

      if (!user) {
        return null;
      }

      return {
        ...todo,
        user,
      };
    })
    .filter(todo => todo !== null);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const hasTitleError = title.trim() === '';
    const hasUserError = userId === 0;

    setTitleError(hasTitleError);
    setUserError(hasUserError);

    if (hasTitleError || hasUserError) {
      return;
    }

    const newId = Math.max(...state.map(todo => todo.id)) + 1;

    setState([
      ...state,
      {
        id: newId,
        title,
        completed: false,
        userId,
      },
    ]);

    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="todo-title">Title</label>
          <input
            id="todo-title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setTitleError(false);
            }}
          />

          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="todo-user">User</label>

          <select
            id="todo-user"
            data-cy="userSelect"
            value={userId}
            onChange={event => {
              setUserId(+event.target.value);
              setUserError(false);
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={preparedTodos} />
      </section>
    </div>
  );
};
