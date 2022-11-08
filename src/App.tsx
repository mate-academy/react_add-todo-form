import React, { useState } from 'react';
import { Todo } from './types/Todo';
import './App.scss';
import { TodoList } from './components/TodoList';
import { User } from './types/User';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App:React.FC = () => {
  const [visibleTodos, setVisibleTodos] = useState([...todos]);
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState(0);
  const [errorExistence, setErrorExistence] = useState(false);
  const [selectError, setSelectError] = useState(false);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setSelectError(false);
  };

  const handleUserName = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(+event.target.value);
    setErrorExistence(false);
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim().length) {
      setSelectError(true);
    }

    if (!selectedUser) {
      setErrorExistence(true);
    }

    if (title.trim().length && selectedUser) {
      const newTodo = {
        userId: selectedUser || 0,
        id: Math.max(...visibleTodos.map(todo => todo.id)) + 1,
        title: title.trim(),
        completed: selectError,
        user: usersFromServer.find(user => user.id === selectedUser) || null,
      };

      setVisibleTodos([...visibleTodos, newTodo]);
      setTitle('');
      setSelectedUser(0);
      setSelectError(false);
      setErrorExistence(false);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          Title:&nbsp;
          <input
            type="text"
            data-cy="titleInput"
            name="todoTitle"
            placeholder="Please enter a title"
            value={title}
            onChange={handleTitle}
          />

          {selectError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          User:&nbsp;
          <select
            data-cy="userSelect"
            name="todoUser"
            value={selectedUser}
            onChange={handleUserName}
          >
            <option value={0} disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>

          {errorExistence && (
            <span className="error">Plese choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
