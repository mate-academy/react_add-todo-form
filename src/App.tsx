import React, { useState } from 'react';

import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';

const findUsers = (userId: number) => {
  return usersFromServer.find(user => user.id === userId) || null;
};

const currentTodos = todosFromServer.map(todo => ({
  ...todo,
  user: findUsers(todo.userId),
}));

export const App = () => {
  const [selectedUser, setSelectedUser] = useState(0);
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(true);
  const [userError, setUserError] = useState(true);
  const [submit, setSubmit] = useState(false);
  const [todos, setTodos] = useState<Todo[]>(currentTodos);

  const onAdd = (todo: Omit<Todo, 'user'>): void => {
    const newTodo = { ...todo, user: findUsers(todo.userId) };

    setTodos(prevTodo => [...prevTodo, newTodo]);
  };

  const newId = () => {
    if (todos.length === 0) {
      return 0;
    }

    return Math.max(...todos.map(todo => todo.id)) + 1;
  };

  const clearForm = () => {
    setTitle('');
    setSelectedUser(0);
  };

  const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmit(true);

    if (!title || !selectedUser) {
      return;
    }

    onAdd({
      title,
      completed: false,
      userId: selectedUser,
      id: newId(),
    });

    clearForm();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleChange}>
        <div className="field">
          <label htmlFor="title">
            Title:{' '}
            <input
              id="title"
              value={title}
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              onChange={e => {
                setTitle(e.target.value);
                setTitleError(e.target.value === '' ? true : false);
              }}
            />
            {submit && titleError && (
              <span className="error">Please enter a title</span>
            )}
          </label>
        </div>

        <div className="field">
          <label htmlFor="user">
            User:{' '}
            <select
              id="user"
              data-cy="userSelect"
              value={selectedUser}
              onChange={e => {
                setSelectedUser(+e.target.value);
                setUserError(+e.target.value === 0 ? true : false);
              }}
            >
              <option value="0" disabled>
                Choose a user
              </option>
              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            {submit && userError && (
              <span className="error">Please choose a user</span>
            )}
          </label>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
