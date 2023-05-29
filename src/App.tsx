import './App.scss';
import React, { FormEventHandler, useState } from 'react';
import users from './api/users';
import todos from './api/todos';

// import usersFromServer from './api/users';
// import todosFromServer from './api/todos';

export const App = () => {
  const [description, setDescription] = useState('');
  const [activeUser, setUser] = useState('0');
  const [userError, setUserError] = useState('0');
  const [descriptionError, setDescriptionError] = useState('0');

  const handleInput: React.ChangeEventHandler <HTMLInputElement> = (event) => {
    event.preventDefault();
    setDescriptionError('0');
    setDescription(event.target.value);
  };

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();

    if (description !== '' && activeUser !== '0') {
      todos.push(
        {
          userId: +activeUser,
          title: description,
          completed: false,
          id: todos.length + 1,
        },
      );

      setDescription('');
      setUser('0');
    }

    if (activeUser === '0') {
      setUserError('1');
    }

    if (description === '') {
      setDescriptionError('1');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST" onSubmit={handleSubmit}>
        <div
          className="field"
        >

          <input
            type="text"
            data-cy="titleInput"
            onChange={handleInput}
            value={description}
          />

          <span className="error">
            {descriptionError === '1' && 'Please enter a title'}
          </span>
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={activeUser}
            onChange={(event) => {
              setUser(event.target.value);
              setUserError('0');
            }}
          >

            <option value="0" disabled>
              Choose a user
            </option>
            {users
              .map(user => (
                <option value={user.id}>
                  {user.name}
                </option>
              ))}
            ;
          </select>

          <span
            className="error"
          >
            {userError === '1' && 'Please choose a user'}
          </span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        {todos
          .map(todo => (
            <article
              data-id={todo.id}
              className={`TodoInfo ${todo.completed && 'TodoInfo--completed'}`}
            >

              <h2 className="TodoInfo__title">
                {todo.title}
              </h2>

              <a
                className="UserInfo"
                href={users.find(user => user.id === todo.userId)?.email}
              >

                {users.find(user => user.id === todo.userId)?.name}
              </a>
            </article>
          ))}
      </section>
    </div>
  );
};
