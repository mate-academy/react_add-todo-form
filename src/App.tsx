import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [users] = useState(usersFromServer);

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('0');
  const [triedSubmit, setTriedSubmit] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTriedSubmit(true);
    const titleError = title.trim() === '';
    const userError = userId === '0';

    if (titleError || userError) {
      return;
    }

    const newId = todos.length
      ? Math.max(...todos.map(todo => todo.id)) + 1
      : 1;

    const userObj = users.find(user => user.id === Number(userId));

    const newTodo = {
      id: newId,
      title: title.trim(),
      userId: Number(userId),
      completed: false,
      user: userObj,
    };

    setTodos(prev => [...prev, newTodo]);
    setTitle('');
    setUserId('0');
    setTriedSubmit(false);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title-input">Title</label>
          <input
            id="title-input"
            value={title}
            onChange={event => {
              const clean = event.target.value.replace(
                /[^A-Za-z\u0400-\u04FF0-9 ]/g,
                '',
              );

              setTitle(clean);
            }}
            type="text"
            data-cy="titleInput"
          />
          {triedSubmit && title.trim() === '' && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user-select">User</label>
          <select
            id="user-select"
            value={userId}
            onChange={event => {
              setUserId(event.target.value);
              if (triedSubmit) {
                setTriedSubmit(false);
              }
            }}
            data-cy="userSelect"
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {users.map(user => (
              <option key={user.id} value={String(user.id)}>
                {user.name}
              </option>
            ))}
          </select>

          {triedSubmit && userId === '0' && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <section className="TodoList">
        {todos.map(todo => {
          const user = users.find(person => person.id === todo.userId);

          return (
            <article
              key={todo.id}
              data-id={todo.id}
              className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
            >
              <h2 className="TodoInfo__title">{todo.title}</h2>
              <a className="UserInfo" href={`mailto:${user?.email}`}>
                {user?.name}
              </a>
            </article>
          );
        })}
      </section>
    </div>
  );
};
