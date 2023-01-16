import React, { useState } from 'react';
import './App.scss';

import Box from '@mui/material/Box';
import { Button, MenuItem } from '@mui/material';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

function findUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

const preparedTodos: Todo[] = todosFromServer.map(todo => {
  return {
    ...todo,
    user: findUserById(todo.userId),
  };
});

function findUserByName(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const App = () => {
  const defaultUserOption = 'Choose a user';
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [todos, setTodos] = useState(preparedTodos);
  const [isTitleErrorOccured, setIsTitleErrorOccured] = useState(false);
  const [
    isSelectedUserErrorOccured,
    setIsSelectedUserErrorOccured,
  ] = useState(false);

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedUserId === 0 || title === '') {
      if (title === '') {
        setIsTitleErrorOccured(true);
      }

      if (selectedUserId === 0) {
        setIsSelectedUserErrorOccured(true);
      }

      return;
    }

    const newUser = findUserByName(selectedUserId);

    setTodos(currentTodo => {
      const maxTodoId = Math.max(...currentTodo.map(todo => todo.id));

      setTitle('');
      setSelectedUserId(0);

      return [
        ...currentTodo,
        {
          id: maxTodoId + 1,
          title,
          completed: false,
          userId: newUser ? newUser.id : null,
          user: newUser,
        },
      ];
    });
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitleErrorOccured(false);
  };

  const handleSelectedUserChange
    = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedUserId(+event.target.value);
      setIsSelectedUserErrorOccured(false);
    };

  return (
    <div className="App">
      <h1 className="title">Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
        className="form"
      >
        <div className="field">
          <TextField
            sx={{ display: 'flex' }}
            data-cy="titleInput"
            type="text"
            id="title"
            name="title"
            label="Title: "
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />

          {isTitleErrorOccured && (
            <FormHelperText sx={{ position: 'absolute' }}>
              Please enter a title
            </FormHelperText>
          )}
        </div>

        <div className="field">
          <TextField
            sx={{ display: 'flex' }}
            select
            data-cy="userSelect"
            id="userSelect"
            name="userSelect"
            value={selectedUserId}
            label="User: "
            onChange={handleSelectedUserChange}
          >
            <MenuItem value="0" disabled>
              {defaultUserOption}
            </MenuItem>

            {usersFromServer.map(user => (
              <MenuItem key={user.id} value={user.id}>
                {user.name}
              </MenuItem>
            ))}
          </TextField>

          {isSelectedUserErrorOccured && (
            <FormHelperText sx={{ position: 'absolute' }}>
              Please choose a user
            </FormHelperText>
          )}
        </div>

        <Box textAlign="center">
          <Button
            variant="contained"
            type="submit"
            data-cy="submitButton"
          >
            Add
          </Button>
        </Box>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
