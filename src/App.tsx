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
  const [hasTitle, setHasTitle] = useState(false);
  const [selectedUser, setSelectedUser] = useState(0);
  const [hasUser, setHasUser] = useState(false);
  const [isCompleted, setCompleted] = useState(false);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value.replace(/[^a-zA-Z0-9А-Яа-я\s]/g, ''));
    setHasTitle(false);
  };

  const handleName = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(+event.target.value);
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim().length) {
      setHasTitle(true);
    }

    if (!selectedUser) {
      setHasUser(true);
    }

    if (title.trim().length && selectedUser) {
      const newTodo = {
        userId: selectedUser || 0,
        id: visibleTodos[visibleTodos.length - 1].id + 1,
        title: title.trim(),
        completed: isCompleted,
        user: usersFromServer.find(user => user.id === selectedUser) || null,
      };

      setVisibleTodos([...visibleTodos, newTodo]);
      setTitle('');
      setSelectedUser(0);
      setCompleted(false);
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

          {hasTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          User:&nbsp;
          <select
            data-cy="userSelect"
            name="todoUser"
            value={selectedUser}
            onChange={handleName}
          >
            <option value={0} disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>

          {hasUser && (
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
