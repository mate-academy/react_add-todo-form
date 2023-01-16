import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import './App.scss';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { User } from './types/User';

function findUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

const preparedTodos: Todo[] = todosFromServer.map(todo => {
  return {
    ...todo,
    user: findUserById(todo.userId),
  };
});

export const App = () => {
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState(0);
  const [todos, setTodos] = useState(preparedTodos);
  const [isUserError, setUserError] = useState(false);
  const [isTitleEror, setTitleError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTitleError(!title.trim());
    setUserError(!selectedUser);

    if (title.trim() === '' || !selectedUser) {
      return;
    }

    const addedUser = findUserById(+selectedUser);

    setTodos(current => {
      const nextTodo = Math.max(...current.map(todo => todo.id)) + 1;

      return [
        ...current,
        {
          id: nextTodo,
          title,
          completed: false,
          userId: addedUser ? addedUser.id : null,
          user: addedUser,
        },
      ];
    });

    setTitle('');
    setSelectedUser(0);
  };

  const handleTitleChange = (
    { target }: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTitle(target.value);
    setTitleError(false);
  };

  const handleUserChange = (
    { target }: SelectChangeEvent,
  ) => {
    setSelectedUser((+target.value));
    setUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form className="form" onSubmit={handleSubmit}>
        <div
          className="field"
        >
          <TextField
            sx={{ input: { background: 'white' } }}
            type="text"
            className="form__field-input"
            placeholder="Enter a title"
            id="title"
            name="title"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
          />

          {isTitleEror && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <FormControl sx={{ m: 0, minWidth: 195, background: 'white' }}>
            <Select
              data-cy="userSelect"
              id="userSelect"
              name="userSelect"
              value={selectedUser.toString()}
              onChange={handleUserChange}
            >
              <MenuItem value={0} disabled>
                <span>Choose a user</span>
              </MenuItem>

              {usersFromServer.map(({ id, name }) => (
                <MenuItem key={id} value={id}>{name}</MenuItem>
              ))}
            </Select>

            {isUserError && (
              <span className="error">Please choose a user</span>
            )}
          </FormControl>
        </div>

        <Button
          variant="contained"
          type="submit"
          data-cy="submitButton"
        >
          Add
        </Button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
