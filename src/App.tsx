import React, { useState } from 'react';
import './App.scss';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { User } from './components/types/User';
import { Todo } from './components/types/Todo';

function getUser(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const preparedTodo: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const theBiggestIndex = (array: { id: number }[]) => (
  Math.max(...array.map(todo => todo.id)) + 1
);

export const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState(0);
  const [selectedTitle, setSelectedTitle] = useState('');

  const [todos, setTodos] = useState(preparedTodo);

  const [isTitleError, setTitleError] = useState(false);
  const [isUserError, setUserError] = useState(false);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTitle(event.target.value);
    setTitleError(false);
  };

  const handleUser = (event: SelectChangeEvent<number>) => {
    setSelectedUser(+event.target.value);
    setUserError(false);
  };

  const hadleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (selectedTitle === '') {
      setTitleError(true);
    }

    if (selectedUser === 0) {
      setUserError(true);
    }

    if (selectedTitle && selectedUser) {
      setSelectedTitle('');
      setSelectedUser(0);

      setTodos(prev => {
        const newTodo = {
          id: theBiggestIndex(prev),
          userId: selectedUser,
          title: selectedTitle,
          completed: false,
          user: getUser(selectedUser),
        };

        return [...prev, newTodo];
      });
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form
        action="/api/users"
        method="POST"
        onSubmit={hadleSubmit}
      >
        <div
          className="field"
        >
          Title:
          <TextField
            id="outlined-basic"
            label="Enter a title"
            variant="outlined"
            type="text"
            data-cy="titleInput"
            value={selectedTitle}
            onChange={handleTitle}
          />

          {isTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            User:
            <Select
              data-cy="userSelect"
              value={selectedUser}
              onChange={handleUser}
            >
              <MenuItem value="0" disabled>Choose a user</MenuItem>

              {usersFromServer.map(user => (
                <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
              ))}
            </Select>
          </label>
          {isUserError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <Button
          sx={{ mt: 1 }}
          type="submit"
          data-cy="submitButton"
          variant="contained"
          color={isUserError || isTitleError
            ? 'error'
            : 'success'}
        >
          Add
        </Button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
