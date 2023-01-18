import React, { FC, useState } from 'react';

import {
  Container,
  Grid,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  FormControl,
  Button,
} from '@mui/material';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';

import { getNewId } from './helpers/helpers';
import { User, Todo } from './react-app-env';

const getUserById = (userId: number): User | null => {
  return usersFromServer.find(user => user.id === userId) || null;
};

const todosWithUser: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: FC = () => {
  const [todos, setTodos] = useState(todosWithUser);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [userId, setUserId] = useState(0);

  const [
    titleErrorMessage,
    setTitleErrorMessage,
  ] = useState('');
  const [
    userErrorMessage,
    setUserErrorMessage,
  ] = useState('');

  const [showTitleError, setShowTitleError] = useState(false);
  const [showUserError, setShowUserError] = useState(false);

  const reset = () => {
    setTitle('');
    setDescription('');
    setUserId(0);
    setShowTitleError(false);
    setShowUserError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title || !userId) {
      setTitleErrorMessage(!title ? 'Please enter a title' : '');
      setUserErrorMessage(!userId ? 'Please choose a user' : '');

      setShowTitleError(!title);
      setShowUserError(!userId);

      return;
    }

    setTodos(prev => {
      const newTodo = {
        id: getNewId(prev),
        title,
        description,
        completed: false,
        userId,
        user: getUserById(userId),
      };

      return [...prev, newTodo];
    });

    reset();
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleErrorMessage('');
    setTitle(event.target.value);
  };

  const handleChangeDescription = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDescription(event.target.value);
  };

  const handleSelectChange = (
    event: React.SelectChangeEvent<HTMLSelectElement>,
  ) => {
    setUserErrorMessage('');
    setUserId(+event.target.value);
  };

  return (
    <div className="App">
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '10vh' }}
      >
        <h1>Add todo form</h1>

        <form
          action="/api/users"
          method="POST"
          onSubmit={handleSubmit}
        >
          <FormControl
            className="field"
            sx={{ width: 400 }}
          >
            <TextField
              id="titleInput"
              label="Title:"
              variant="outlined"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleChangeTitle}
              error={showTitleError}
              helperText={titleErrorMessage}
            />
          </FormControl>
          <br />

          <FormControl
            className="field"
            sx={{ mt: 2, width: 400 }}
          >
            <TextField
              id="descriptionInput"
              label="Description:"
              variant="outlined"
              placeholder="Enter a description"
              value={description}
              onChange={handleChangeDescription}
            />
          </FormControl>
          <br />

          <FormControl
            className="field"
            sx={{ mt: 2, width: 400 }}
            error={showUserError}
          >
            <InputLabel>User:</InputLabel>
            <Select
              id="userInput"
              label="User:"
              data-cy="userSelect"
              value={userId}
              onChange={(event) => handleSelectChange(event)}
            >
              <MenuItem value={0} disabled>
                <em>Choose a user</em>
              </MenuItem>
              {
                usersFromServer.map(userFromServer => (
                  <MenuItem
                    key={userFromServer.id}
                    value={userFromServer.id}
                  >
                    {userFromServer.name}
                  </MenuItem>
                ))
              }
            </Select>
            <FormHelperText>
              {userErrorMessage}
            </FormHelperText>
          </FormControl>

          <Container sx={{ textAlign: 'center' }}>
            <Button
              type="submit"
              variant="contained"
              data-cy="submitButton"
            >
              Add
            </Button>
          </Container>
        </form>

        <TodoList todos={todos} />
      </Grid>
    </div>
  );
};
