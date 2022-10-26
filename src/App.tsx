import React, { useState } from 'react';
import 'bulma';
import './App.scss';

import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

const getUser = (userId: number): User | null => {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
};

export const todosListWithUsers: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

const generateId = (todos: Todo[]) => {
  return [...todos].sort(
    (prevTodo, currTodo) => currTodo.id - prevTodo.id,
  )[0].id + 1;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(todosListWithUsers);
  const [title, setTitle] = useState('');
  const [authorId, setAuthorId] = useState(0);
  const [isTitleError, setIsTitleError] = useState(false);
  const [isAuthorError, setIsAuthorError] = useState(false);

  const clearForm = () => {
    setTitle('');
    setAuthorId(0);
    setIsTitleError(false);
    setIsAuthorError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title || authorId === 0) {
      if (!title) {
        setIsTitleError(true);
      }

      if (authorId === 0) {
        setIsAuthorError(true);
      }

      return;
    }

    const todo: Todo = {
      id: generateId(todos),
      title,
      completed: false,
      userId: authorId,
      user: getUser(authorId),
    };

    setTodos((prevTodos) => [...prevTodos, todo]);
    clearForm();
  };

  const handleOnInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isTitleError) {
      setIsTitleError(false);
    }

    setTitle(event.target.value.replace(/[^a-zа-я0-9\s]/gi, ''));
  };

  const handleOnSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (isAuthorError) {
      setIsAuthorError(false);
    }

    setAuthorId(+event.target.value);
  };

  return (
    <section className="App container section">
      <h1 className="App__title title is-1">
        Add todo form
      </h1>

      <form
        action="/api/users"
        method="POST"
        className="mb-5"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label className="label">
            Write todo title

            <div className="control">
              <input
                type="text"
                data-cy="titleInput"
                value={title}
                className="input"
                onChange={handleOnInput}
                placeholder="Todo title"
              />
            </div>
          </label>

          {isTitleError && (
            <p className="error help is-danger">Please enter a title</p>
          )}
        </div>

        <div className="field">
          <label className="label" htmlFor="select">
            Select author

            <div className="control">
              <div className="select is-flex">
                <select
                  data-cy="userSelect"
                  className="select container"
                  id="select"
                  onChange={handleOnSelect}
                  value={authorId}
                >
                  <option value="0" disabled>Choose a user</option>

                  {usersFromServer.map(({ id, name }: User) => (
                    <option value={id} key={id}>{name}</option>
                  ))}
                </select>
              </div>
            </div>
          </label>

          {isAuthorError && (
            <p className="error help is-danger">Please choose a user</p>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          className="button is-primary"
        >
          Add
        </button>
      </form>

      <div className="TodoList">
        <TodoList todos={todos} />
      </div>
    </section>
  );
};
