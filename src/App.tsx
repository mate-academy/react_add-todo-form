import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(id: number) {
  return usersFromServer.find((user) => user.id === id) || null;
}

const post = todosFromServer.map((postUser) => (
  {
    ...postUser,
    user: getUser(postUser.userId),
  }
));

function addTodoUser(userId:string, title: string) {
  const { id } = (([...post].sort((a, b) => a.id - b.id))[post.length - 1]);

  post.push(
    {
      id: id + 1,
      title,
      completed: false,
      userId: +userId,
      user: usersFromServer.find(userUFS => userUFS.id === +userId) || null,
    },
  );

  return post;
}

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [user, setUser] = useState('0');
  const [todo, setTodo] = useState(post);
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorUser, setErrorUser] = useState(false);

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
            Title:
            <input
              type="text"
              data-cy="titleInput"
              value={title}
              onChange={(event) => {
                setTitle(event.currentTarget.value);
                setErrorTitle(false);
              }}
            />
            {errorTitle && <span className="error">Please enter a title</span> }
          </label>
        </div>

        <div className="field">
          <label>
            User:
            <select
              data-cy="userSelect"
              defaultValue={user}
              value={user}
              onChange={(event) => {
                setUser(event.target.value);
                setErrorUser(false);
              }}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(userSelect => (
                <option
                  value={userSelect.id}
                  key={userSelect.id}
                  data-cy="userSelect"
                >
                  {userSelect.name}
                </option>

              ))}
            </select>
          </label>

          {errorUser && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={() => {
            if (user === '0') {
              setErrorUser(true);
            }

            if (title === '') {
              setErrorTitle(true);
            }

            if (user === '0' || title === '') {
              return;
            }

            setTodo(addTodoUser(user, title));
            setTitle('');
            setUser('0');
          }}
        >
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList post={todo} />
      </section>
    </div>
  );
};
