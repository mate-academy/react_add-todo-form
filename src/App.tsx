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
  const [isSelectError, setIsSelectError] = useState(false);
  const [isTitleError, setIsTitleError] = useState(false);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitleError(false);
  };

  const handleUserName = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(Number(event.target.value));
    setIsSelectError(false);
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const titleTrim = title.trim().length;

    if (!titleTrim) {
      setIsTitleError(true);
    }

    if (!selectedUser) {
      setIsSelectError(true);
    }

    if (title.trim().length && selectedUser) {
      const newTodo = {
        userId: selectedUser || 0,
        id: Math.max(...visibleTodos.map(todo => todo.id)) + 1,
        title: title.trim(),
        completed: isTitleError,
        user: usersFromServer.find(user => user.id === selectedUser) || null,
      };

      setVisibleTodos([...visibleTodos, newTodo]);
      setTitle('');
      setSelectedUser(0);
      setIsTitleError(false);
      setIsSelectError(false);
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

          {isTitleError && (
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
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {isSelectError && (
            <span className="error">Please choose a user</span>
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
