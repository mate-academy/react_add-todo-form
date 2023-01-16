import './App.scss';
import React, { useState } from 'react';
import cn from 'classnames';
import users from './api/users';
import importedTodos from './api/todos';

// import usersFromServer from './api/users';
// import todosFromServer from './api/todos';

interface Todo {
  id: number,
  title: string,
  completed: boolean,
  userId: number
}

interface User {
  id: number,
  name: string,
  username: string,
  email: string,
}

function findUserById(id: number): User | null {
  return users.find(user => user.id === id) || null;
}

function findBiggestTodoId(todoList: Todo[]): number {
  return todoList.reduce((prev, todo) => (prev > todo.id ? prev : todo.id), 0);
}

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState(importedTodos);
  const [selectedUserId, setSelectedUserId] = useState('0');
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleUserSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(event.target.value);
    setUserError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      setTitleError(true);
    }

    if (selectedUserId === '0') {
      setUserError(true);
    }

    if (!title.trim() || selectedUserId === '0') {
      return;
    }

    setTitle('');
    setSelectedUserId('0');

    setTodos(currentTodos => [...currentTodos, {
      id: findBiggestTodoId(todos) + 1,
      title,
      completed: false,
      userId: +selectedUserId,
    }]);
  };

  return (
    <div className="App">
      <h1>
        Add todo form
      </h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              title="title"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleTitleChange}
            />
          </label>
          {titleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              title="select user"
              value={selectedUserId}
              onChange={handleUserSelect}
            >
              <option value="0" disabled>Choose a user</option>
              {users.map(user => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>

            {userError && (
              <span className="error">Please choose a user</span>
            )}
          </label>
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <section className="TodoList">
        {todos.map(todo => (
          <article
            data-id={todo.id}
            className={cn('TodoInfo', {
              'TodoInfo--completed': todo.completed,
            })}
          >
            <h2 className="TodoInfo__title">
              {todo.title}
            </h2>

            <a
              className="UserInfo"
              href={`mailto:${findUserById(todo.userId)?.email}`}
            >
              {findUserById(todo.userId)?.name}
            </a>
          </article>
        ))}
      </section>
    </div>
  );
};
