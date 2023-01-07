import React, { FC, useState } from 'react';
import './App.scss';

import {
  Button,
  FormControl,
  TextField,
  Select,
  SelectChangeEvent,
  MenuItem,
  InputLabel,
  FormHelperText,
  Paper,
} from '@mui/material';

import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { User } from './types/User';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

const getUserById = (array: User[], id: number) => {
  return array.find(user => user.id === id) || null;
};

const todosWithUsers: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(usersFromServer, todo.userId),
}));

enum DefaultValue {
  TITLE = '',
  SELECT = '',
}

export const App: FC = () => {
  const [title, setTitle] = useState<string>(DefaultValue.TITLE);
  const [selectedUserName, setSelectedUserName]
    = useState<string>(DefaultValue.SELECT);
  const [todos, setTodos] = useState<Todo[]>(todosWithUsers);
  const [errorForTitle, setErrorForTitle] = useState<boolean>(false);
  const [errorForUserSelect, setErrorForUserSelect] = useState<boolean>(false);

  const clearForm = () => {
    setTitle(DefaultValue.TITLE);
    setSelectedUserName(DefaultValue.SELECT);
  };

  const getLargestUserId = (array: Todo[]) => {
    return Math.max(...array.map(item => item.id));
  };

  const getUser = (array: User[]) => {
    return array.find(person => (
      person.name === selectedUserName
    )) || null;
  };

  const handleSubmitForm = (event: React.FormEvent) => {
    event.preventDefault();

    const fieldsNotEmpty = selectedUserName && title;

    if (fieldsNotEmpty) {
      const id = getLargestUserId(todos) + 1;
      const user = getUser(usersFromServer);

      setTodos(currenTodos => [
        ...currenTodos,
        {
          id,
          title,
          completed: false,
          userId: user ? user.id : null,
          user,
        }]);

      clearForm();
    }

    if (title === DefaultValue.TITLE) {
      setErrorForTitle(true);
    }

    if (selectedUserName === DefaultValue.SELECT) {
      setErrorForUserSelect(true);
    }
  };

  const handleUserSelect = (event: SelectChangeEvent) => {
    const { value } = event.target;

    setErrorForUserSelect(false);
    setSelectedUserName(value);
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setTitle(value);
    setErrorForTitle(false);
  };

  return (
    <div className="App">
      <Paper className="container">
        <h1>Add todo form</h1>

        <form
          action="/api/users"
          method="POST"
          className="App__form"
          onSubmit={handleSubmitForm}
        >

          <FormControl
            error={errorForTitle}
          >
            <div className="field">

              <TextField
                label="Title: "
                className="titleInput"
                id="titleInput"
                name="titleInput"
                type="text"
                size="medium"
                value={title}
                onChange={handleInput}
                data-cy="titleInput"
                error={errorForTitle}
              />
              {errorForTitle
                && (<FormHelperText>Please enter a title</FormHelperText>)}
            </div>
          </FormControl>

          <FormControl
            sx={{ width: '300px' }}
            error={errorForUserSelect}
          >
            <InputLabel id="select-label">User: </InputLabel>

            <Select
              labelId="select-label"
              name="userSelect"
              value={selectedUserName}
              id="userSelect"
              onChange={handleUserSelect}
              label="User: "
              data-cy="userSelect"
              error={errorForUserSelect}
              size="medium"
            >

              {usersFromServer.map((user) => (
                <MenuItem
                  key={user.id}
                  value={user.name}
                >
                  {user.name}
                </MenuItem>
              ))}
            </Select>

            {errorForUserSelect && (
              <FormHelperText>Please choose a user</FormHelperText>
            )}
          </FormControl>

          <Button
            data-cy="submitButton"
            type="submit"
            className="button"
            variant="contained"
            color={
              (!errorForUserSelect && !errorForTitle)
                ? 'primary'
                : 'error'
            }
          >
            Add
          </Button>
        </form>
        <TodoList todos={todos} />
      </Paper>
    </div>
  );
};
