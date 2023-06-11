import './App.scss';
import React, { FormEventHandler, useState } from 'react';
import users from './api/users';
import todos from './api/todos';

// import usersFromServer from './api/users';
// import todosFromServer from './api/todos';

type Todo = {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
};

const finder = (todo: Todo) => {
  return users.find(user => user.id === todo.userId);
};

export const App = () => {
  const [description, setDescription] = useState('');
  const [activeUser, setUser] = useState('0');
  const [userError, setUserError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const handleInput: React.ChangeEventHandler <HTMLInputElement> = (event) => {
    event.preventDefault();
    setDescriptionError(false);
    setDescription(event.target.value);
  };

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();

    if (description && activeUser !== '0') {
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
      setUserError(true);
    }

    if (description === '') {
      setDescriptionError(true);
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
            {descriptionError && 'Please enter a title'}
          </span>
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={activeUser}
            onChange={(event) => {
              setUser(event.target.value);
              setUserError(false);
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {users
              .map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            ;
          </select>

          <span
            className="error"
          >
            {userError && 'Please choose a user'}
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
              key={todo.id}
            >
              <h2 className="TodoInfo__title">
                {todo.title}
              </h2>

              <a
                className="UserInfo"
                href={finder(todo)?.email}
              >

                {finder(todo)?.name}
              </a>
            </article>
          ))}
      </section>
    </div>
  );
};
