import React, { ChangeEvent, FormEvent, useState } from 'react';
import './App.scss';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [newTitle, setNewTitle] = useState('');
  const [visibleTodos, setVisibleTodos] = useState(todos);
  const [selectedUserName, setSelectedUserName] = useState('');
  const [isTitle, setIsTitle] = useState(true);
  const [isUserChose, setIsUserChose] = useState(true);

  const handleTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
    setIsTitle(true);
  };

  const handleUserNameLSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserName(event.target.value);
    setIsUserChose(true);
  };

  const hendleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (newTitle && selectedUserName) {
      const newUser = usersFromServer
        .find(user => user.name === selectedUserName) || null;

      const todosId = visibleTodos.map(todo => todo.id);
      const newTodoId = Math.max(...todosId) + 1;

      const newTodo: Todo = {
        id: newTodoId,
        title: newTitle,
        userId: newUser?.id || null,
        completed: false,
        user: newUser,
      };

      setVisibleTodos([...visibleTodos, newTodo]);

      setNewTitle('');
      setSelectedUserName('');
    }

    if (!newTitle) {
      setIsTitle(false);
    }

    if (!selectedUserName) {
      setIsUserChose(false);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={hendleFormSubmit}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            name="title"
            value={newTitle}
            onChange={handleTitle}
          />
          {!isTitle && (
            <span className="error">
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            id="user"
            data-cy="userSelect"
            value={selectedUserName}
            onChange={handleUserNameLSelect}
          >
            <option value="" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id}>{user.name}</option>
            ))}
          </select>
          {!isUserChose && (
            <span className="error">
              Please choose a user
            </span>
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
