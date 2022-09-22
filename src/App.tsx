import './App.scss';
import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

export const App: React.FC = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [errorVisiableUser, setErrorVisiableUser] = useState(false);
  const [errorVisiableTitle, setErrorVisiableTitle] = useState(false);

  const handleSuccess = (userId: number) => {
    if (userId !== 0 && newTodoTitle !== '') {
      setTodos([
        ...todos,
        {
          userId,
          id: todos.length + 1,
          title: newTodoTitle,
          completed: false,
        },
      ]);

      setSelectedUserId(0);
      setNewTodoTitle('');
    }

    if (userId === 0) {
      setErrorVisiableUser(true);
    } else {
      setErrorVisiableUser(false);
    }

    if (newTodoTitle === '') {
      setErrorVisiableTitle(true);
    } else {
      setErrorVisiableTitle(false);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={(event) => {
        event.preventDefault();
        handleSuccess(selectedUserId);
      }}
      >
        <div className="field">
          Title:
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter todo title"
            value={newTodoTitle.trim()}
            onChange={(event) => {
              setNewTodoTitle(event.target.value);
            }}
          />
          {errorVisiableTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          User:
          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={(event) => {
              setSelectedUserId(Number(event.target.value));
            }}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map((user) => (
              <option value={user.id}>{user.name}</option>
            ))}
          </select>

          {errorVisiableUser && (
            <span className="error">Please chose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>
      <TodoList users={usersFromServer} todos={todos} />
    </div>
  );
};
