import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types';

export const App = () => {
  const todosWhithUsers: Todo[] = todosFromServer.map(todo => {
    const foundUser = usersFromServer.find(user => user.id === todo.userId)!;

    return { ...todo, user: foundUser };
  });

  const [todos, setTodos] = useState<Todo[]>(todosWhithUsers);
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [query, setQuery] = useState<string>('');
  const [errors, setErrors] = useState<{ title: boolean; user: boolean }>({
    title: false,
    user: false,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!query) {
      setErrors(prev => ({ ...prev, title: true }));
    }

    if (!selectedUserId) {
      setErrors(prev => ({ ...prev, user: true }));
    }

    if (query && selectedUserId) {
      const newTodo: Todo = {
        id: todos.reduce((maxId, todo) => Math.max(maxId, todo.id), 0) + 1,
        title: query,
        userId: selectedUserId,
        completed: false,
        user: usersFromServer.find(user => user.id === selectedUserId)!,
      };

      setTodos(prev => [...prev, newTodo]);
      setQuery('');
      setSelectedUserId(0);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            placeholder="Write a title"
            data-cy="titleInput"
            value={query}
            onChange={event => {
              setQuery(
                event.target.value.replace(
                  /[^a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ0-9\s]/g,
                  '',
                ),
              );
              setErrors(prev => ({ ...prev, title: false }));
            }}
          />
          {errors.title ? (
            <span className="error">Please enter a title</span>
          ) : null}
        </div>

        <div className="field">
          <label htmlFor="users">Users</label>
          <select
            id="users"
            value={selectedUserId}
            onChange={event => {
              setSelectedUserId(+event.target.value);
              setErrors(prev => ({ ...prev, user: false }));
            }}
            data-cy="userSelect"
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => {
              return (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>

          {errors.user ? (
            <span className="error">Please choose a user</span>
          ) : null}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
