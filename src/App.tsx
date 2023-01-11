import './App.scss';
import React, { useState } from 'react';

import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

function getUserName(userName: string): User | null {
  const foundUser = usersFromServer.find(user => user.name === userName);

  return foundUser || null;
}

const preparedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(preparedTodos);
  const [title, setTitle] = useState('');
  const [userName, setUserName] = useState('');
  const [isTitleError, setIsTitleError] = useState(false);
  const [isUserNameError, setIsUserNameError] = useState(false);

  const handleTitile = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
    setIsTitleError(false);
  };

  const handleUserName = (event: SelectChangeEvent) => {
    setUserName(event.target.value);
    setIsUserNameError(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsTitleError(!title.trim());
    setIsUserNameError(!userName);

    if (title.trim() === '' || !userName) {
      return;
    }

    const userToAdd = getUserName(userName);

    setTodos(current => {
      const maxTodoId = Math.max(...current.map(todo => todo.id));

      return [
        ...current,
        {
          id: maxTodoId + 1,
          title,
          completed: false,
          userId: userToAdd ? userToAdd.id : null,
          user: userToAdd,
        },
      ];
    });

    setTitle('');
    setUserName('');
  };

  return (
    <div className="App">
      <h1 className="App__title">Add todo form</h1>

      <form
        className="App__form"
        action="/api/users"
        method="POST"
        onSubmit={handleChange}
      >
        <FormControl sx={{ width: '40ch' }}>
          <div className="field">
            <TextField
              fullWidth
              label="Enter a title"
              id="title"
              name="title"
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleTitile}
              className="title"
            />
            {isTitleError && (
              <FormHelperText
                className="error"
              >
                Please enter a title
              </FormHelperText>
            )}
          </div>
          <div className="field">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                User
              </InputLabel>
              <Select
                labelId="select-label"
                label="User"
                id="userName"
                data-cy="userSelect"
                value={userName}
                onChange={handleUserName}
                className="userName"
                fullWidth
              >
                {usersFromServer.map(user => (
                  <MenuItem value={user.name} key={user.id}>
                    {user.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {isUserNameError && (
              <FormHelperText
                className="error"
              >
                Please choose a user
              </FormHelperText>
            )}
          </div>
        </FormControl>

        <Button
          className="button"
          type="submit"
          data-cy="submitButton"
          variant="contained"
          color="success"
          size="large"
        >
          Add
        </Button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
