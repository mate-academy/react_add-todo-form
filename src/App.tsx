import React, { FC, useState } from 'react';
import './App.scss';

import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { Paper } from '@mui/material';

import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { Stars } from './components/Stars-backgound/Stars';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

const getUserById = (array: User[], id: number) => {
  return array.find(user => user.id === id) || null;
};

const todosWithUsers: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(usersFromServer, todo.userId),
}));

export const App: FC = () => {
  const defaultValueInput = '';

  const [title, setInput] = useState<string>(defaultValueInput);
  const [selectedUserID, setUser] = useState<string>(defaultValueInput);
  const [todos, setTasks] = useState<Todo[]>(todosWithUsers);
  const [errorForTitle, setErrorForTitle] = useState<boolean>(false);
  const [errorForSelect, setErrorForUserSelect] = useState<boolean>(false);

  const clearForm = (defaultValue: string) => {
    setInput(defaultValue);
    setUser(defaultValue);
  };

  const getLargestUserId = (array: Todo[]) => {
    return Math.max(...array.map(item => item.id));
  };

  const getUser = (array: User[]) => {
    return array.find(person => (
      person.name === selectedUserID
    )) || null;
  };

  const handleSubmitForm = (event: React.FormEvent) => {
    event.preventDefault();

    const fieldsNotEmpty = selectedUserID && title;

    if (fieldsNotEmpty) {
      const id = getLargestUserId(todos) + 1;
      const user = getUser(usersFromServer);

      setTasks(currenTodos => [
        ...currenTodos,
        {
          id,
          title,
          completed: false,
          userId: user ? user.id : null,
          user,
        }]);

      clearForm(defaultValueInput);
    }

    if (selectedUserID === defaultValueInput) {
      setErrorForUserSelect(true);
    }

    if (title === defaultValueInput) {
      setErrorForTitle(true);
    }
  };

  const handleUserSelect = (event: SelectChangeEvent) => {
    const { value } = event.target;

    setErrorForUserSelect(false);
    setUser(value);
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setInput(value);
    setErrorForTitle(false);
  };

  return (
    <div className="App">
      <Stars />
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
            error={errorForSelect}
          >
            <InputLabel id="select-label">User: </InputLabel>

            <Select
              labelId="select-label"
              name="userSelect"
              value={selectedUserID}
              id="userSelect"
              onChange={handleUserSelect}
              label="User: "
              data-cy="userSelect"
              error={errorForSelect}
              size="medium"
            >

              {usersFromServer.map((user) => (
                <MenuItem
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </MenuItem>
              ))}
            </Select>

            {errorForSelect && (
              <FormHelperText>Please choose a user</FormHelperText>
            )}
          </FormControl>

          <Button
            data-cy="submitButton"
            type="submit"
            className="button"
            variant="contained"
          >
            Add
          </Button>
        </form>
        <TodoList todos={todos} />
      </Paper>
    </div>
  );
};
