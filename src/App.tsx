import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import React, { useState } from 'react';
import { Todos } from './types/Todos';
import { Users } from './types/Users';

function getUserById(userId: number) {
  return usersFromServer.find((user: Users) => user.id === userId) || null;
}

const todosPlusUser: Todos[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todos[]>(todosPlusUser);
  const [wasSubmitted, setWasSubmitted] = useState(false);

  const [newTodo, setNewTodo] = useState({
    title: '',
    userId: 0,
  });

  const reset = () => {
    setNewTodo({
      title: '',
      userId: 0,
    });
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    setNewTodo(prevTodo => ({ ...prevTodo, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!newTodo.title || !newTodo.userId) {
      setWasSubmitted(true);

      return;
    }

    const Id = Math.max(0, ...todos.map(todo => todo.id)) + 1;
    const selectedUser = getUserById(+newTodo.userId);

    const todoToAdd = {
      id: Id,
      title: newTodo.title,
      userId: +newTodo.userId,
      completed: false,
      user: selectedUser,
    };

    setTodos(prev => [...prev, todoToAdd]);

    setWasSubmitted(false);
    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          {'Title: '}
          <input
            name="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={newTodo.title}
            onChange={handleChange}
            className={wasSubmitted && !newTodo.title ? 'is-danger' : ''}
          />

          {wasSubmitted && !newTodo.title && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          {'User: '}
          <select
            data-cy="userSelect"
            value={newTodo.userId}
            onChange={handleChange}
            name="userId"
            className={wasSubmitted && !newTodo.userId ? 'is-danger' : ''}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => {
              return (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>

          {wasSubmitted && !newTodo.userId && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
