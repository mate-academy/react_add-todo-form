import { useState } from 'react';
import classNames from 'classnames';

import './App.scss';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import { getUserById } from './services/user';
import { User } from './types/User';
import { Todo } from './types/Todo';

export const allTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

const getNewTodoId = (todos: Todo[]) => {
  return Math.max(...todos.map(todo => todo.id)) + 1;
};

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(allTodos);

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const sanitizedValue = inputValue.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '');

    setTitle(sanitizedValue);
    setHasTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const addTodo = (todo: Todo) => {
    const newTodo = {
      ...todo,
      id: getNewTodoId(todos),
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  const reset = () => {
    setTitle('');
    setUserId(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasUserIdError(!userId);

    if (!title.trim()) {
      setHasTitleError(!title.trim());
      setTitle('');

      return;
    }

    if (!title || !userId) {
      return;
    }

    addTodo({
      id: 0,
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    });

    reset();
  };

  return (
    <div className="App">
      <div className="flex-title">
        <h1 className="page-title">
          Add your ToDo using form below
        </h1>

        <h1 className="page-title">
          &#128071;
        </h1>
      </div>

      <form
        action="/api/todos"
        method="POST"
        className="content"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label className="label" htmlFor="todo-title">
            Title:
          </label>

          <div className={classNames('control', 'max-width', {
            'has-icons-right': hasTitleError,
          })}
          >
            <input
              id="todo-title"
              className={classNames('input', {
                'is-danger': hasTitleError,
              })}
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleTitleChange}
            />

            {hasTitleError && (
              <span className="icon is-small is-right">
                <i className="fas fa-exclamation-triangle has-text-danger" />
              </span>
            )}
          </div>

          {hasTitleError && (
            <p className="error help is-danger">
              Please enter a title
            </p>
          )}
        </div>

        <div className="field">
          <label className="label" htmlFor="todo-user">
            User:
          </label>

          <div className="control has-icons-left">
            <div className={classNames('select', {
              'is-danger': hasUserIdError,
            })}
            >
              <select
                id="todo-user"
                data-cy="userSelect"
                value={userId}
                onChange={handleUserIdChange}
              >
                <option>Choose a user</option>

                {usersFromServer.map(({ id, name }: User) => (
                  <option value={id} key={id}>
                    {name}
                  </option>
                ))}
              </select>

              {hasUserIdError && (
                <span className="error help is-danger">
                  Please choose a user
                </span>
              )}
            </div>

            <span className="icon is-small is-left">
              <i className="fas fa-user" />
            </span>
          </div>
        </div>

        <div className="buttons adder">
          <button
            type="submit"
            data-cy="submitButton"
            className="button is-link"
          >
            Add
          </button>
        </div>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
