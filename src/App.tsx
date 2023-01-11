import './App.scss';
import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { User } from './types/User';

function findUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

function findUserByName(userName: string): User | null {
  return usersFromServer.find(user => user.name === userName) || null;
}

const readyTodos: Todo[] = todosFromServer.map(todo => {
  return {
    ...todo,
    user: findUserById(todo.userId),
  };
});

export const App = () => {
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [todos, setTodos] = useState(readyTodos);
  const [isErrorUserSelect, setErrorUsrSelect] = useState(false);
  const [isErrorOnTitle, setErrorOnTitle] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
    setErrorOnTitle(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(event.currentTarget.value);
    setErrorUsrSelect(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorOnTitle(!title.trim());
    setErrorUsrSelect(!selectedUser);

    if (title.trim() === '' || !selectedUser) {
      return;
    }

    const userToAdd = findUserByName(selectedUser);

    setTodos(current => {
      const maxToDoId = Math.max(...current.map(todo => todo.id));

      return [
        ...current,
        {
          id: maxToDoId + 1,
          title,
          completed: false,
          userId: userToAdd ? userToAdd.id : null,
          user: userToAdd,
        },
      ];
    });

    setTitle('');
    setSelectedUser('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <label
            htmlFor="title"
            className="label"
          >
            Enter your task:
          </label>

          <input
            data-cy="titleInput"
            type="text"
            id="title"
            name="title"
            value={title}
            placeholder="Enter title of task"
            onChange={handleTitleChange}
          />

          {isErrorOnTitle && (
            <Alert
              className="error"
              severity="error"
            >
              Please enter a title
            </Alert>
          )}
        </div>

        <div className="field">
          <label
            htmlFor="userSelect"
            className="label"
          >
            Choose user:
          </label>

          <select
            data-cy="userSelect"
            id="userSelect"
            name="userSelect"
            value={selectedUser}
            className="form-select mb-3"
            onChange={handleUserChange}
          >
            <option value="" disabled>Choose a user</option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.name}>{user.name}</option>
            ))}
          </select>

          {isErrorUserSelect && (
            <Alert
              className="error"
              severity="error"
            >
              Please choose a user
            </Alert>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      {' '}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            width: 'fit-content',
            height: '100%',
            padding: '10px',
          },
        }}
      >
        <Paper elevation={24}>
          <TodoList todos={todos} />

        </Paper>
      </Box>

    </div>
  );
};
