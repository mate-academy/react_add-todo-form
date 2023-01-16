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

function getUserById(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

function getUserByName(userName: string): User | null {
  const foundUser = usersFromServer.find(user => user.name === userName);

  return foundUser || null;
}

const preparedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(preparedTodos);
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [isTitleError, setIsTitleError] = useState(false);
  const [isUserNameError, setIsUserNameError] = useState(false);

  const handleChangeTitile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isTitleError === false) {
      setTitle(event.currentTarget.value);
      setIsTitleError(false);
    }
  };

  const handleChangeUser = (event: SelectChangeEvent) => {
    if (isUserNameError === false) {
      setSelectedUser(event.target.value);
      setIsUserNameError(false);
    }
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsTitleError(!title.trim());
    setIsUserNameError(!selectedUser);

    if (title.trim() === '' || !selectedUser) {
      return;
    }

    const userToAdd = getUserByName(selectedUser);

    setTodos(prevTodo => {
      const maxTodoId = Math.max(...prevTodo.map(todo => todo.id));

      const todoItem = {
        id: maxTodoId + 1,
        title,
        completed: false,
        userId: userToAdd ? userToAdd.id : null,
        user: userToAdd,
      };

      return [
        ...prevTodo,
        todoItem,
      ];
    });

    setTitle('');
    setSelectedUser('');
  };

  return (
    <div className="App">
      <h1 className="App__title">Add todo form</h1>

      <form
        className="App__form"
        onSubmit={handleSubmit}
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
              onChange={handleChangeTitile}
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
                value={selectedUser}
                onChange={handleChangeUser}
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
