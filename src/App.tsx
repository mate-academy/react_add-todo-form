import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './react-app-env';

export const App = () => {
  const [userSelect, setUserSelect] = useState<number>(-1);
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const submit = (todos: Todo[]) => {
    setTitle('');

    setTodos([
      ...todos,
      {
        id: Date.now(),
        title,
        completed: false,
        userId: userSelect,
      },
    ]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => {
          event.preventDefault();
          if (!userSelect) {
            return;
          }

          submit(todos);
        }}
      >
        <div className="field">
          <label>
            <span>Title:</span>
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
            {title ? '' : <span className="error">Please enter a title</span>}
          </label>
        </div>

        <div className="field">
          <label>
            <span>User:</span>
            <select
              data-cy="userSelect"
              defaultValue=""
              value={userSelect || ''}
              onChange={(event) => setUserSelect(+event.target.value)}
            >
              <option value="" selected disabled>
                Choose a user
              </option>
              {usersFromServer.map((user) => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>

            <span className="error">
              {userSelect ? '' : 'Please choose a user'}
            </span>
          </label>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList usersFromServer={usersFromServer} todos={todos} />
      </section>
    </div>
  );
};
