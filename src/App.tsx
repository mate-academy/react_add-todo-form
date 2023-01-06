import React, { useState } from 'react';

import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

import './App.scss';

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

const preparedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function getUserByName(name: string, users: User[]) {
  return users.find(user => name === user.name) || null;
}

export const App: React.FC = () => {
  const titleDefault = '';
  const userNameDefault = '';

  const [title, setTitle] = useState(titleDefault);
  const [selectedUserName, setSelectedUserName] = useState(userNameDefault);
  const [todos, setTodos] = useState(preparedTodos);
  const [isErrorOnTitle, setIsErrorOnTitle] = useState(false);
  const [isErrorOnUser, setIsErrorOnUser] = useState(false);

  const clearForm = () => {
    setTitle(titleDefault);
    setSelectedUserName(userNameDefault);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
    setIsErrorOnTitle(false);
  };

  const handleUserChange = (event: SelectChangeEvent) => {
    setSelectedUserName(event.target.value);
    setIsErrorOnUser(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsErrorOnTitle(!title.trim());
    setIsErrorOnUser(!selectedUserName);

    if (title.trim() && selectedUserName) {
      const selectedUser = getUserByName(selectedUserName, usersFromServer);

      setTodos(currentTodo => {
        const maxTodoId = Math.max(...currentTodo.map(todo => todo.id));

        return [
          ...currentTodo,
          {
            id: maxTodoId + 1,
            title,
            completed: false,
            userId: selectedUser ? selectedUser.id : null,
            user: selectedUser,
          },
        ];
      });

      clearForm();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        className="form"
        onSubmit={handleSubmit}
      >
        <FormControl
          className="field"
          sx={{ mb: 2 }}
          error={isErrorOnTitle}
        >
          <TextField
            type="text"
            data-cy="titleInput"
            id="title"
            name="title"
            label="Your title:"
            error={isErrorOnTitle}
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter your title"
            autoComplete="off"
          />
          {isErrorOnTitle && (
            <FormHelperText className="error">
              Please enter a title
            </FormHelperText>
          )}
        </FormControl>

        <FormControl
          className="field"
          sx={{ mb: 1 }}
          error={isErrorOnUser}
        >
          <InputLabel id="userSelectLabel">Select User</InputLabel>
          <Select
            data-cy="userSelect"
            id="userSelect"
            labelId="userSelectLabel"
            label="Select User"
            name="userSelect"
            value={selectedUserName}
            onChange={handleUserChange}
          >
            <MenuItem value={userNameDefault} disabled>Choose a user</MenuItem>
            {usersFromServer.map(user => (
              <MenuItem key={user.id} value={user.name}>{user.name}</MenuItem>
            ))}
          </Select>

          {isErrorOnUser && (
            <FormHelperText className="error">
              Please choose a user
            </FormHelperText>
          )}
        </FormControl>

        <Button
          type="submit"
          data-cy="submitButton"
          variant="contained"
          color="success"
          endIcon={<SendIcon />}
        >
          Add
        </Button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
