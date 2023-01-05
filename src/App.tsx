import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUserById(users: User[], id: number) {
  return users.find(user => id === user.id) || null;
}

const todosWithUser: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(usersFromServer, todo.userId),
}));

function getUserByName(name: string, users: User[]) {
  return users.find(user => name === user.name) || null;
}

function getLargestTodoId(todos: Todo[]) {
  return Math.max(...todos.map(todo => todo.id));
}

export const App: React.FC = () => {
  const titleDefaultValue = '';
  const userNameDefaultValue = 'Choose a user';

  const [title, setTitle] = useState(titleDefaultValue);
  const [selectedUserName, setUser] = useState(userNameDefaultValue);
  const [todos, setTodos] = useState(todosWithUser);
  const [isErrorOnUserSelect, setIsErrorOnUserSelect] = useState(false);
  const [isErrorOnTitleInput, setIsErrorOnTitleInput] = useState(false);

  const clearForm = (defaultTitle: string, defaultUserName: string) => {
    setTitle(defaultTitle);
    setUser(defaultUserName);
  };

  const handleSubmitForm = (event: React.FormEvent) => {
    event.preventDefault();

    if (
      selectedUserName !== userNameDefaultValue && title !== titleDefaultValue
    ) {
      const newUser = getUserByName(selectedUserName, usersFromServer);

      setTodos(currentTodo => (
        [
          ...currentTodo,
          {
            id: getLargestTodoId(todos) + 1,
            title,
            completed: false,
            userId: newUser ? newUser.id : null,
            user: newUser,
          },
        ]
      ));

      clearForm(titleDefaultValue, userNameDefaultValue);
    }

    if (selectedUserName === userNameDefaultValue) {
      setIsErrorOnUserSelect(true);
    }

    if (title === titleDefaultValue) {
      setIsErrorOnTitleInput(true);
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
    setIsErrorOnTitleInput(false);
  };

  const handleUserChange = (event: SelectChangeEvent) => {
    setUser(event.target.value);
    setIsErrorOnUserSelect(false);
  };

  return (
    <div className="App">
      <Paper
        sx={{ padding: '16px' }}
        elevation={3}
      >
        <h1>Add todo form</h1>

        <form
          action="/api/users"
          method="POST"
          onSubmit={handleSubmitForm}
          className="App__form"
        >
          <FormControl
            sx={{ marginBottom: '32px', width: '300px' }}
            error={isErrorOnTitleInput}
          >

            <TextField
              error={isErrorOnTitleInput}
              id="outlined-error-helper-text"
              type="text"
              name="titleInput"
              label="Title: "
              value={title}
              onChange={handleTitleChange}
              placeholder="Enter a title"
              data-cy="titleInput"
              autoComplete="off"
            />
            {isErrorOnTitleInput && (
              <FormHelperText
                sx={{ position: 'absolute', bottom: '-20px' }}
              >
                Please enter a title
              </FormHelperText>
            )}
          </FormControl>

          <FormControl
            sx={{ marginBottom: '32px', width: '300px' }}
            error={isErrorOnUserSelect}
          >
            <InputLabel id="demo-simple-select-error-label">
              {'User: '}
            </InputLabel>
            <Select
              labelId="demo-simple-select-error-label"
              id="demo-simple-select-helper"
              name="userSelect"
              value={selectedUserName}
              label="User: "
              onChange={handleUserChange}
              data-cy="userSelect"
            >
              <MenuItem value={userNameDefaultValue} disabled>
                {userNameDefaultValue}
              </MenuItem>
              {usersFromServer.map(userInfo => (
                <MenuItem value={userInfo.name} key={userInfo.id}>
                  {userInfo.name}
                </MenuItem>
              ))}
            </Select>
            {isErrorOnUserSelect && (
              <FormHelperText
                sx={{ position: 'absolute', bottom: '-20px' }}
              >
                Please choose a user
              </FormHelperText>
            )}
          </FormControl>

          <Button
            sx={{ display: 'block' }}
            type="submit"
            variant="contained"
            data-cy="submitButton"
            color={(
              isErrorOnTitleInput || isErrorOnUserSelect
                ? 'error'
                : 'primary'
            )}
          >
            Add
          </Button>
        </form>

        <TodoList todos={todos} />
      </Paper>
    </div>
  );
};
