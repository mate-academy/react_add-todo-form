import './App.scss';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './components/types/User';
import { Todo } from './components/types/Todo';

function getUser(UserId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === UserId);

  return foundUser || null;
}

export const visibleTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [todoInfo, setTodoInfo] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [todoInfoError, setTodoInfoError] = useState(false);
  const [selectedUserIdError, setSelectedUserIdError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoInfo(event.target.value);
    setTodoInfoError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
    setSelectedUserIdError(false);
  };

  const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (todoInfo && selectedUserId) {
      const newTodo: Todo = {
        id: visibleTodos.length + 1,
        userId: selectedUserId,
        title: todoInfo,
        completed: false,
        user: getUser(selectedUserId),
      };

      visibleTodos.push(newTodo);
      setTodoInfo('');
      setSelectedUserId(0);
    } else {
      setTodoInfoError(!todoInfo);
      setSelectedUserIdError(!selectedUserId);
    }
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
          {'Title: '}
          <input
            type="text"
            data-cy="titleInput"
            value={todoInfo}
            onChange={handleTitleChange}
            placeholder="Enter a title"
          />
          {todoInfoError && <span className="error">Please enter a title</span>}

        </div>

        <div className="field">
          {'User: '}
          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={handleUserChange}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {selectedUserIdError
            && <span className="error">Please choose a user</span>}
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
