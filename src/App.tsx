import './App.scss';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoWithUser } from './types/TodoWithUser';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [titleValid, setTitleValid] = useState(true);
  const [userValid, setUserValid] = useState(true);
  const clearTodo: TodoWithUser = {
    id: 0,
    title: '',
    completed: false,
    userId: 0,
    user: {
      id: 0,
      name: '',
      username: '',
      email: '',
    },
  };

  const [newTodo, setNewTodo] = useState(clearTodo);

  const reset = () => {
    setNewTodo(clearTodo);
  };

  const isValid = newTodo.userId && newTodo.title.trim();

  const handleChange = (event: React.FormEvent) => {
    event.preventDefault();

    if (!newTodo.title.trim()) {
      setTitleValid(false);
    }

    if (newTodo.userId === 0) {
      setUserValid(false);
    }

    if (isValid) {
      const maxId = Math.max(...todos.map(todo => todo.id)) + 1;
      const newUser = usersFromServer.find(user => user.id === newTodo.userId);

      setNewTodo({
        id: maxId,
        title: newTodo.title,
        completed: false,
        userId: newTodo.userId,
        user: newUser || null,
      });

      setTodos(prevTodos => [
        ...prevTodos,
        {
          ...newTodo,
          id: maxId,
          user: newUser || null,
        },
      ]);
      reset();
    }
  };

  const todosWithUser = todos.map(todo => {
    const currentUser = usersFromServer.find(user => user.id === todo.userId);

    return { ...todo, user: currentUser || null };
  });

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleChange}>
        <div className="field">
          Title:{' '}
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={newTodo.title}
            onChange={event => {
              setNewTodo({ ...newTodo, title: event.target.value });
              setTitleValid(true);
            }}
          />
          {titleValid || <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          User:{' '}
          <select
            data-cy="userSelect"
            value={newTodo.userId}
            onChange={event => {
              setNewTodo({ ...newTodo, userId: +event.target.value });
              setUserValid(true);
            }}
          >
            <option value={0} disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => {
              const { id, name } = user;

              return (
                <option value={id} key={id}>
                  {name}
                </option>
              );
            })}
          </select>
          {userValid || <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todosWithUser} />
    </div>
  );
};
