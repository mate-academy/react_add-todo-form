import React, { useState } from 'react';

import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { User } from './types/User';

function getUserById(id: number): User | undefined {
  return usersFromServer.find((u: User) => u.id === id);
}

function getTodos(): Todo[] {
  return todosFromServer.map((item: Todo) => ({
    ...item,
    user: getUserById(item.userId),
  }));
}

function getUsers(): User[] {
  return usersFromServer;
}

export const App = () => {
  const users = getUsers();
  const [todos, setTodos] = useState(getTodos());

  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [isSelectedUserIdError, setSelectedUserIdError] =
    useState<boolean>(false);

  const [title, setTitle] = useState<string>('');
  const [isTitleError, setTitleError] = useState<boolean>(false);

  const reset = () => {
    setSelectedUserId(0);
    setSelectedUserIdError(false);
    setTitle('');
    setTitleError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setTitleError(!title);
    setSelectedUserIdError(!selectedUserId);

    if (!title || !selectedUserId) {
      return;
    }

    setTodos((list: Todo[]) => {
      const newId = Math.max(0, ...list.map(todo => todo.id)) + 1;
      const newTodo: Todo = {
        id: newId,
        title,
        completed: false,
        userId: selectedUserId,
        user: getUserById(selectedUserId),
      };

      return [...list, newTodo];
    });

    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit} action="/api/todos" method="POST">
        <div className="field">
          <input
            onChange={event => {
              setTitle(event.target.value);
              setTitleError(false);
            }}
            value={title}
            type="text"
            placeholder="Enter title"
            data-cy="titleInput"
          />
          {isTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            value={selectedUserId}
            onChange={event => {
              setSelectedUserId(+event.target.value);
              setSelectedUserIdError(false);
            }}
            data-cy="userSelect"
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {users.map((user: User) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {isSelectedUserIdError && (
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
