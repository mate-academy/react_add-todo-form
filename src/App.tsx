import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [newTitle, setNewTitle] = useState('');
  const [visibleTodos, setVisibleTodos] = useState(todos);
  const [selectedUserName, setSelectedUserName] = useState('');
  const [isTitle, setIsTitle] = useState(true);
  const [isUserChose, setIsUserChose] = useState(true);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => {
          event.preventDefault();

          if (!newTitle) {
            setIsTitle(false);
          }

          if (!selectedUserName) {
            setIsUserChose(false);
          }

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
        }}
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
            onChange={(event) => {
              setNewTitle(event.target.value);
              setIsTitle(true);
            }}
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
            onChange={(event) => {
              setSelectedUserName(event.target.value);
              setIsUserChose(true);
            }}
          >
            <option value="" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id}>{user.name}</option>
            ))}
          </select>
          {(!isUserChose) && (
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
