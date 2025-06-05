import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import classNames from 'classnames';
import { TodoList } from './components/TodoList';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([...todosFromServer]);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value.replace(/[^a-zA-Z0-9 ]/g, ''));
    setHasTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title.trim());
    setHasUserIdError(!userId);

    if (!title.trim() || !userId) {
      return;
    }

    const nextId = Math.max(0, ...todos.map(todo => todo.id)) + 1;
    const user = usersFromServer.find(u => u.id === userId)!;

    const newTodo: Todo = {
      id: nextId,
      title: title.trim(),
      userId,
      completed: false,
      user,
    };

    setTodos(current => [...current, newTodo]);
    setTitle('');
    setUserId(0);
  };

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">Add todo form</h1>

        <form onSubmit={handleSubmit} className="box">
          <div className="field">
            <label htmlFor="title" className="label">
              Title
            </label>
            <div
              className={classNames('control', {
                'has-icons-right': hasTitleError,
              })}
            >
              <input
                type="text"
                className={classNames('input', {
                  'is-danger': hasTitleError,
                })}
                placeholder="Enter a title"
                value={title}
                onChange={handleTitleChange}
                data-cy="titleInput"
              />
            </div>
            {hasTitleError && (
              <p className="help is-danger error">Please enter a title</p>
            )}

            {hasUserIdError && (
              <p className="help is-danger error">Please choose a user</p>
            )}
          </div>

          <div className="field">
            <label htmlFor="user" className="label">
              User
            </label>
            <div className="control">
              <div
                className={classNames('select', {
                  'is-danger': hasUserIdError,
                })}
              >
                <select
                  value={userId}
                  onChange={handleUserChange}
                  data-cy="userSelect"
                >
                  <option value={0}>Choose a user</option>
                  {usersFromServer.map(user => (
                    <option value={user.id} key={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="button is-link"
            data-cy="submitButton"
          >
            Add
          </button>
        </form>

        <TodoList todos={todos} />
      </div>
    </main>
  );
};
