import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App = () => {
  const [userSelect, setUserSelect] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState(todosFromServer);

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
        }}
      >
        <div className="field">
          <label>
            <span>
              Title:
            </span>
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title || ''}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <span className="error">
              {title ? '' : 'Please enter a title'}
            </span>
          </label>
        </div>

        <div className="field">
          <label>
            <span>
              User:
            </span>
            <select
              data-cy="userSelect"
              value={userSelect || ''}
              defaultValue="Choose a user"
              onChange={(e) => setUserSelect(+e.target.value)}
            >
              {usersFromServer.map((user) => {
                return <option value={user.id}>{user.name}</option>;
              })}
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
        {todos.map((todo) => (
          <article data-id={todo.id} className="TodoInfo TodoInfo--completed">
            <h2 className="TodoInfo__title">{todo.title}</h2>
            <a className="UserInfo" href="mailto:Sincere@april.biz">
              {
                usersFromServer.filter((user) => user.id === todo.userId)[0]
                  .name
              }
            </a>
          </article>
        ))}
      </section>
    </div>
  );
};
