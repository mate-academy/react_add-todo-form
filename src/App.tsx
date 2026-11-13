
import { useState } from 'react';
import type { FormEvent } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

type User = (typeof usersFromServer)[number];
type ServerTodo = (typeof todosFromServer)[number];

type Todo = ServerTodo & {
  user: User | null;
};

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId) || null,
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const selectedUser = usersFromServer.find(
      user => user.id === userId,
    );

    setTitleError(!trimmedTitle);
    setUserError(!selectedUser);

    if (!trimmedTitle || !selectedUser) {
      return;
    }

    const nextId = Math.max(0, ...todos.map(todo => todo.id)) + 1;

    const newTodo: Todo = {
      id: nextId,
      title: trimmedTitle,
      userId: selectedUser.id,
      completed: false,
      user: selectedUser,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);

    setTitle('');
    setUserId(0);
    setTitleError(false);
    setUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
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

          {titleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="todo-user">User</label>

          <select
            id="todo-user"
            data-cy="userSelect"
            value={userId}
            onChange={event => {
              setUserId(Number(event.target.value));
              setUserError(false);
            }}
          >
            <option value={0} disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        {todos.map(todo => (
          <article
            key={todo.id}
            data-id={todo.id}
            className={`TodoInfo ${
              todo.completed ? 'TodoInfo--completed' : ''
            }`}
          >
            <h2 className="TodoInfo__title">
              {todo.title}
            </h2>

            {todo.user && (
              <a
                className="UserInfo"
                href={`mailto:${todo.user.email}`}
              >
                {todo.user.name}
              </a>
            )}
          </article>
        ))}
      </section>
    </div>
  );
};
