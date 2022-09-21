import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { useState } from 'react';
import { Todo } from './components/types/Todo';
import { User } from './components/types/User';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todosDefault: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const getMaxId = (prevTodos: Todo[]) => {
  return Math.max(...prevTodos.map(({ id }) => id)) + 1;
}

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState(todosDefault);
  const [userId, setUserId] = useState(0);
  const [userError, setUserError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const addTodo = () => {
    if (title && userId !== 0) {
      setTodos((prevTodos: Todo[]) => (
        [...prevTodos, {
          id: getMaxId(prevTodos),
          title,
          completed: false,
          userId,
          user: getUser(userId)
        }]
      ));
      setTitle('');
      setUserId(0);
    }

    if (!title) {
      setTitleError(true);
    }

    if (userId === 0) {
      setUserError(true);
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
        }}
      >
        <div className="field">
          <label>
            Title:{' '}
            <input
              name='title'
              type="text"
              data-cy="titleInput"
              placeholder='Enter a title'
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
                setTitleError(false);
              }}
              required={!true}
            />
          </label>
          {titleError && <span className="error">Please enter a title</span>}

        </div>

        <div className="field">
          <label>
            User:{' '}
            <select
              data-cy="userSelect"
              value={userId}
              onChange={(event) => {
                setUserId(+event.target.value);
                setUserError(!true);
              }}
              required
            >
              <option value="0" disabled selected>Choose a user</option>
              {usersFromServer.map(user =>
                <option value={user.id}>{user.name}</option>
              )}

            </select>
          </label>

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={addTodo}
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
