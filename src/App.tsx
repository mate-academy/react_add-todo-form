import React, { useState } from 'react';
import './App.scss';
import {
  Paper,
  FormControl,
  TextField,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Button,
} from '@mui/material';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todo } from './types/Todo';

function getUserById(users: User[], id: number) {
  return users.find(user => user.id === id) || null;
}

const preparedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(usersFromServer, todo.userId),
}));

function getLargestTodoId(todos: Todo[]) {
  return Math.max(...todos.map(todo => todo.id));
}

export const App = () => {
  const titleDefaultValue = '';
  const userDefaultValue = 'Choose a user';

  const [title, setTitle] = useState(titleDefaultValue);
  const [selectedUserInfo, setUserName] = useState(userDefaultValue);
  const [isUserError, setUserError] = useState(false);
  const [isTitleError, setErrorTitle] = useState(false);
  const [todos, setTodos] = useState(preparedTodos);

  const handleTitleCHange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
    if (isTitleError) {
      setErrorTitle(false);
    }
  };

  const handleUserChange = (event: SelectChangeEvent) => {
    setUserName(event.target.value);
    if (isUserError) {
      setUserError(false);
    }
  };

  const clearForm = () => {
    setTitle(titleDefaultValue);
    setUserName(userDefaultValue);
  };

  const handleSubmitForm = (event: React.FormEvent) => {
    event.preventDefault();

    if (selectedUserInfo === userDefaultValue) {
      setUserError(true);
    }

    if (title === titleDefaultValue) {
      setErrorTitle(true);
    }

    if (
      selectedUserInfo !== userDefaultValue && title !== titleDefaultValue
    ) {
      const newUser = getUserById(usersFromServer, +(selectedUserInfo));

      setTodos(prevTodo => {
        return [
          ...prevTodo,
          {
            id: getLargestTodoId(prevTodo) + 1,
            title,
            completed: false,
            userId: newUser ? newUser.id : null,
            user: newUser,
          },
        ];
      });

      clearForm();
    }
  };

  return (
    <div className="App">
      <Paper
        sx={{ padding: '24px' }}
        elevation={5}
      >
        <h1 className="App__title">Add todo form</h1>

        <form
          action="/api/users"
          method="POST"
          onSubmit={handleSubmitForm}
          className="App__form"
        >

          <FormControl
            sx={{ marginBottom: '32px', width: '300px' }}
            error={isTitleError}
          >
            <TextField
              error={isTitleError}
              label="Title: "
              id="titleInput"
              name="titleInput"
              type="text"
              data-cy="titleInput"
              value={title}
              onChange={handleTitleCHange}
              placeholder="Title"
            />
            {isTitleError && (
              <FormHelperText
                sx={{ position: 'absolute', bottom: '-20px' }}
              >
                Please enter a title
              </FormHelperText>
            )}
          </FormControl>

          <FormControl
            sx={{ marginBottom: '32px', width: '300px' }}
            error={isUserError}
          >
            <InputLabel id="demo-simple-select-label">
              {'User: '}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              value={selectedUserInfo}
              label="User"
              id="userSelect"
              name="userSelect"
              data-cy="userSelect"
              onChange={handleUserChange}
            >
              <MenuItem value={userDefaultValue} disabled>
                {userDefaultValue}
              </MenuItem>
              {usersFromServer.map(user => (
                <MenuItem value={user.id} key={user.id}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>
            {isUserError && (
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
              isTitleError || isUserError
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
