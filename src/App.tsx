import './App.scss';
import React, { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { FullTodo, Todo } from './types/Todo';
import { User } from './types/User';
import { TodoList } from './components/TodoList';

const prepareTodos = (
  users: User[],
  todos: Todo[],
): FullTodo[] => (
  todos.map((todo) => ({
    ...todo,
    user: users.find((user) => user.id === todo.userId) || null,
  }))
);

const prepareTodo = (
  currentUser: User,
  title: string,
  todos: Todo[],
): FullTodo => {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return ({
    id: maxId + 1,
    title,
    completed: false,
    userId: currentUser.id,
    user: currentUser,
  });
};

const visibleTodos = prepareTodos(usersFromServer, todosFromServer);
const users = usersFromServer;

export const App: React.FC = () => {
  const [userSelected, setUserSelected] = useState('0');
  const [userError, setUserError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState(visibleTodos);

  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserError(false);
    const { value } = event.target;

    setUserSelected(value);
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleError(false);
    const { value } = event.target;

    setTitle(value);
  };

  const resetForm = () => {
    setTitle('');
    setUserSelected('0');
  };

  const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const currentUser = users
      .find(user => user.name === userSelected) || null;

    if (!currentUser) {
      setUserError(true);
    }

    if (!title.length) {
      setTitleError(true);
    }

    if (currentUser && title) {
      const todo = prepareTodo(currentUser, title, visibleTodos);

      setTodos(current => ([
        ...current,
        todo,
      ]));

      resetForm();
    }
  };

  return (
    <div className="App">
      <h1 className="title">Add todo form</h1>

      <form
        className="form"
        action="/api/users"
        method="POST"
        onSubmit={handleAddTodo}
      >
        <div className="field">
          <label>
            {'Title: '}
            <input
              className="field__input"
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleChangeTitle}
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
              className="field__input"
              data-cy="userSelect"
              value={userSelected}
              onChange={handleChangeSelect}
            >
              <option value="0" disabled>Choose a user</option>
              {users.map((user) => (
                <option value={user.name} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          {userError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          className="add-button"
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={todos} />
      </section>
    </div>
  );
};
