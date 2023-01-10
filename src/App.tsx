import './App.scss';
import React, { useState } from 'react';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

function getUserByName(userName: string): User | null {
  return usersFromServer.find(user => user.name === userName) || null;
}

export const preparedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const defaultOption = 'Choose a user';
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [selectedUser, setSelectedUser] = useState(defaultOption);
  const [selectedUserError, setSelectedUserError] = useState(false);
  const [todos, setTodos] = useState(preparedTodos);

  const handleChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(event.target.value);
    setSelectedUserError(false);
  };

  const handleTitleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const clear = () => {
    setTitle('');
    setSelectedUser(defaultOption);
  };

  const handleSubmit = (event:React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title === '') {
      setTitleError(true);
    }

    if (selectedUser === defaultOption) {
      setSelectedUserError(true);
    }

    if (title !== '' && selectedUser !== defaultOption) {
      setTodos(current => {
        const getTheBiggestId = Math.max(...todos.map((todo) => todo.id));
        const newUser = getUserByName(selectedUser);

        return [...current, {
          id: getTheBiggestId + 1,
          title,
          completed: false,
          userId: getUserById(+selectedUser),
          user: newUser,
        }];
      });
      clear();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label>
            <span> Title: </span>
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleTitleChange}
            />
          </label>
          {titleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            <span> User: </span>
            <select
              data-cy="userSelect"
              onChange={handleChange}
              value={selectedUser}
            >
              <option value={defaultOption} disabled>{defaultOption}</option>
              {usersFromServer.map(user => (
                <option key={user.id} value={user.name}>{user.name}</option>))}
            </select>
          </label>

          {selectedUserError && (
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
