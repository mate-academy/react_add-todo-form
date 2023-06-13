import { FormEvent, useState } from 'react';
import './App.scss';
import {
  FormControl, InputLabel, MenuItem, Select,
  Button,
  TextField,
  Container,
  Box,
  // FormHelperText,
} from '@mui/material';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import { TodoFullInfo } from './types/todoFullInfo';
import { getTodosInfo } from './helpers/getTodosInfo';
import { removeByPattern } from './helpers/removeByPattern';

const todosInfo = getTodosInfo();

export const App = () => {
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [todos, setTodos] = useState(todosInfo);
  const [errorTitle, setErrorTitle] = useState('');
  const [errorSelectedUser, setErrorSelectedUser] = useState('');

  const changeUser = (name: string) => {
    if (name !== '') {
      setErrorSelectedUser('');
    }

    setSelectedUser(name);
  };

  const changeTitle = (newTitle: string) => {
    if (newTitle !== '') {
      setErrorTitle('');
    }

    const pattern = /[@^#$/%^&*()_+-\\{}[\]]/g;
    const patternedTitle = removeByPattern(newTitle, pattern);

    setTitle(patternedTitle);
  };

  const clearForm = () => {
    setTitle('');
    setSelectedUser('');
  };

  const isValid = (): boolean => {
    let result = true;

    if (title === '') {
      setErrorTitle('Please enter a title');

      result = false;
    }

    if (selectedUser === '') {
      setErrorSelectedUser('Please choose a user');

      result = false;
    }

    return result;
  };

  const submit = (event:FormEvent) => {
    event.preventDefault();

    if (!isValid()) {
      return;
    }

    const userInfo = usersFromServer
      .find(user => user.name === selectedUser);

    if (!userInfo) {
      throw new Error('User not found');
    }

    setTodos((prev) => {
      const maxId = Math.max(...prev.map(todo => todo.id));

      return [...prev, {
        id: maxId + 1,
        title,
        userId: userInfo.id,
        completed: false,
        user: userInfo,
      } as TodoFullInfo];
    });

    clearForm();
  };

  return (
    <>
      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >

        <h1>Add todo form</h1>

        <Box
          sx={{
            width: '50%',
            mb: 5,
          }}
        >
          <form
            onSubmit={(event) => submit(event)}
          >

            <FormControl
              fullWidth
              error={errorTitle !== ''}
              size="small"
            >
              <TextField
                data-cy="titleInput"
                label="Enter title"
                onChange={event => changeTitle(event.target.value)}
                type="text"
                sx={{ mb: 3 }}
                fullWidth
                value={title}
                error={errorTitle !== ''}
              />
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="user-select-label">
                Choose user
              </InputLabel>
              <Select
                data-cy="userSelect"
                labelId="user-select-label"
                id="user-simple-select"
                sx={{ mb: 3 }}
                value={selectedUser}
                label="Choose user"
                onChange={(event) => changeUser(event.target.value)}
                error={errorSelectedUser !== ''}
              >
                {usersFromServer.map(user => (
                  <MenuItem
                    key={user.id}
                    value={user.id}
                  >
                    {user.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Button
                data-cy="submitButton"
                type="submit"
                color="success"
              >
                Add
              </Button>
            </Box>

          </form>
        </Box>
        <TodoList todos={todos} />
      </Container>
    </>
  );
};
