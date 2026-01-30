import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const preparedTodos = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId) || null,
}));

export const App = () => {
  const [listTodos, setListTodos] = useState(preparedTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState<number | null>(null);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const isTitleEmpty = !title.trim();
    const isUserNotSelected = !userId || userId === 0;

    if (isTitleEmpty) {
      setHasTitleError(true);
    }

    if (isUserNotSelected) {
      setHasUserError(true);
    }

    if (isTitleEmpty || isUserNotSelected) {
      return;
    }

    const selectedUser =
      usersFromServer.find(user => user.id === userId) || null;
    const newId = Math.max(0, ...listTodos.map(todo => todo.id)) + 1;

    const newTodo = {
      id: newId,
      title: title.trim(),
      userId: userId as number,
      completed: false,
      user: selectedUser,
    };

    setListTodos([...listTodos, newTodo]);

    setTitle('');
    setUserId(0);
  }

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
            placeholder="Enter todo title"
            value={title}
            onChange={event => {
              setTitle(
                event.target.value.replace(/[^a-zA-Zа-яА-ЯіІєЄїЇґҐ0-9 ]/g, ''),
              );
              setHasTitleError(false);
            }}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="todo-user">User</label>
          <select
            id="todo-user"
            data-cy="userSelect"
            value={userId ?? 0}
            onChange={event => {
              setUserId(Number(event.target.value));
              setHasUserError(false);
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {hasUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        {listTodos.map(todo => (
          <article
            key={todo.id}
            data-id={todo.id}
            className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
          >
            <h2 className="TodoInfo__title">{todo.title}</h2>

            {todo.user && (
              <a className="UserInfo" href={`mailto:${todo.user.email}`}>
                {todo.user.name}
              </a>
            )}
          </article>
        ))}
      </section>
    </div>
  );
};
