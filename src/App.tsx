/* eslint-disable no-console */
import React, { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { User } from './types/User';

const getUserById = (id: number) => {
  return usersFromServer.find(user => user.id === id) || null;
};

const todos = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId) || null,
}));

export const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [todoTitle, setTitle] = useState('');
  const [visibleTodos, setTodos] = useState(todos);
  const [noUsers, setNoUsers] = useState(false);
  const [noTodos, setNoTodos] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, id } = event.target;

    switch (id) {
      case 'title':
        setNoTodos(false);
        setTitle(value);
        break;

      case 'user':
        setNoUsers(false);
        setSelectedUser(getUserById(Number(value)));
        break;

      default:
        break;
    }
  };

  const isCompleted = () => {
    return false;
  };

  const handleAddTodo = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    if (!todoTitle) {
      setNoTodos(true);
    }

    if (!selectedUser) {
      setNoUsers(true);
    }

    if (!todoTitle || !selectedUser) {
      return;
    }

    const titleToObj = () => {
      return {
        id: Math.random(),
        title: todoTitle,
        completed: isCompleted(),
        userId: selectedUser.id || -1,
        user: selectedUser,
      };
    };

    setTodos([...visibleTodos, titleToObj(todoTitle)]);
    setTitle('');
    setSelectedUser(null);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleAddTodo}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>

          <input
            type="text"
            data-cy="titleInput"
            id="title"
            placeholder="Enter a title"
            value={todoTitle}
            onChange={handleChange}
          />

          {noTodos && (
            <p className="error">
              Please enter a title
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>

          <select
            data-cy="userSelect"
            name="user"
            value={selectedUser?.id || ''}
            onChange={handleChange}
            id="user"
          >
            <option value="" disabled>Choose a user</option>

            {usersFromServer.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {noUsers && (
            <p className="error">
              Please choose a user
            </p>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
