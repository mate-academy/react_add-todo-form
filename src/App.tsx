import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { useState } from 'react';
import cn from 'classnames';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User | null;
};

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

// const zeroForValueOptionSelect: number = 0;

function getNewTodoId(todoList: Todo[]) {
  const maxId = Math.max(...todoList.map(todo => todo.id));

  return maxId + 1;
}

export const App = () => {
  const [title, setTitle] = useState<string>('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [userId, setUserId] = useState<number>(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);
  const [currentTodos, setCurrentTodos] = useState(todos);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    setCurrentTodos([
      ...currentTodos,
      {
        id: getNewTodoId(currentTodos),
        title,
        completed: false,
        userId,
        user: getUserById(userId),
      },
    ]);

    setTitle('');
    setUserId(0);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  return (
    <div className="section">
      <h1 className="title">Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        className="box"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label className="label" htmlFor="title">
            Title:
          </label>
          <div
            className={cn('control', {
              'has-icons-right': hasTitleError,
            })}
          >
            <input
              id="title"
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              className={cn('input', {
                'is-danger': hasTitleError,
              })}
              value={title}
              onChange={handleTitleChange}
            />

            {hasTitleError && (
              <span className="icon is-small is-right">
                <i className="fas fa-exclamation-triangle has-text-danger"></i>
              </span>
            )}
          </div>
          {hasTitleError && (
            <p className="help is-danger">Please enter a title</p>
          )}
        </div>

        <div className="field">
          <label className="label" htmlFor="user">
            User:
          </label>
          <div className="control has-icons-left">
            <div
              className={cn('select', {
                'is-danger': hasUserIdError,
              })}
            >
              <select
                data-cy="userSelect"
                id="user"
                value={userId}
                onChange={handleUserChange}
              >
                <option value="0" disabled>
                  Choose a user
                </option>
                {usersFromServer.map((user: User) => (
                  <option value={user.id} key={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </span>
            </div>
          </div>
          {hasUserIdError && (
            <p className="help is-danger">Please choose a user</p>
          )}
        </div>

        <div className="buttons">
          <button
            type="submit"
            data-cy="submitButton"
            className="button is-primary"
          >
            Add
          </button>
        </div>
      </form>

      <TodoList todos={currentTodos} />

      {/* <section className="TodoList">
        <article data-id="1" className="TodoInfo TodoInfo--completed">
          <h2 className="TodoInfo__title">delectus aut autem</h2>

          <a className="UserInfo" href="mailto:Sincere@april.biz">
            Leanne Graham
          </a>
        </article>

        <article data-id="15" className="TodoInfo TodoInfo--completed">
          <h2 className="TodoInfo__title">delectus aut autem</h2>

          <a className="UserInfo" href="mailto:Sincere@april.biz">
            Leanne Graham
          </a>
        </article>

        <article data-id="2" className="TodoInfo">
          <h2 className="TodoInfo__title">
            quis ut nam facilis et officia qui
          </h2>

          <a className="UserInfo" href="mailto:Julianne.OConner@kory.org">
            Patricia Lebsack
          </a>
        </article>
      </section> */}
    </div>
  );
};
