import './App.scss';
import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormHelperText, InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField, Typography,
} from '@mui/material';
import { User } from './types/User';
import { Todo } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

const todoForUser: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [userInfo, setUserInfo] = useState<string>('');
  const [todos, setTodos] = useState(todoForUser);
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorUser, setErrorUser] = useState(false);

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorTitle(!title.trim());
    setErrorUser(!userInfo);

    if (title.trim().length === 0 || !userInfo) {
      return;
    }

    const newUser = getUserById(+userInfo);

    setTodos(prevTodo => {
      const maxId = Math.max(...todos.map(todo => todo.id));

      return [
        ...prevTodo,
        {
          id: maxId + 1,
          title,
          completed: false,
          userId: newUser ? newUser.id : null,
          user: newUser,
        },
      ];
    });

    setTitle('');
    setUserInfo('');
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
    setErrorTitle(false);
  };

  const handleUserChange = (event: SelectChangeEvent) => {
    setUserInfo(event.target.value);
    setErrorUser(false);
  };

  return (
    <div className="App">
      <Typography variant="h4" component="h2">
        Add todo form
      </Typography>

      <form
        className="form"
        onSubmit={handleSubmitForm}
      >
        <FormControl sx={{ width: '40ch' }}>
          <div className="field">
            <TextField
              fullWidth
              label="Your task"
              type="text"
              id="title"
              data-cy="titleInput"
              value={title}
              onChange={handleTitleChange}
            />

            {errorTitle && (
              <FormHelperText
                className="error"
              >
                Please enter a title
              </FormHelperText>
            )}
          </div>

          <div className="field">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">User:</InputLabel>
              <Select
                labelId="select-label"
                label="User"
                value={userInfo}
                id="userSelect"
                data-cy="userSelect"
                error={errorTitle}
                onChange={handleUserChange}
                fullWidth
              >
                {usersFromServer.map(user => (
                  <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            {errorUser && (
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
          variant="contained"
          color="success"
          type="submit"
          data-cy="submitButton"
          size="small"
        >
          Add
        </Button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
