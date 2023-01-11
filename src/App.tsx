import './App.scss';
import { useState } from 'react';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

import { User } from './types/User';
import { Todo } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [todoList, setTodoList] = useState(todos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [noTitleError, setNoTitleError] = useState(false);
  const [noUserError, setNoUserError] = useState(false);

  const getId = (taskList: { id: number }[]) => (
    (Math.max(...taskList.map(task => task.id)) + 1)
  );

  const handleChangeTitle = (newValue: string) => {
    setTitle(newValue);
    setNoTitleError(false);
  };

  const handleChangeUser = (newValue: number) => {
    setUserId(newValue);
    setNoUserError(false);
  };

  const reset = () => {
    setTitle('');
    setUserId(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title || !userId) {
      setNoTitleError(!title);
      setNoUserError(!userId);

      return;
    }

    setTodoList(prevList => {
      const newTask = {
        id: getId(prevList),
        title,
        userId,
        completed: false,
        user: getUser(userId),
      };

      return ([...todoList, newTask]);
    });

    reset();
  };

  return (
    <div className="App">
      <h1 className="title">Add todo form</h1>

      <Box>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth onSubmit={handleSubmit}>
            <InputLabel id="demo-simple-select-label">User</InputLabel>
            <Select
              sx={{ marginBottom: 2 }}
              data-cy="userSelect"
              value={userId}
              onChange={(event) => handleChangeUser(+event.target.value)}
              label="User"
            >
              <MenuItem value={0}>Choose a user</MenuItem>

              {usersFromServer.map(person => (
                <MenuItem value={person.id} key={person.id}>
                  {person.name}
                </MenuItem>
              ))}
            </Select>

            {noUserError && (
              <span className="error">Please choose a user</span>
            )}

            <TextField
              sx={{ marginBottom: 2 }}
              placeholder="Please enter a title"
              data-cy="titleInput"
              id="outlined-basic"
              label="Title"
              variant="outlined"
              value={title}
              onChange={(event) => handleChangeTitle(event.target.value)}
            />

            {noTitleError && (
              <span className="error">Please enter a title</span>
            )}
          </FormControl>

          <Button
            type="submit"
            data-cy="submitButton"
            variant="contained"
            endIcon={<SendIcon />}
          >
            Add task
          </Button>
        </form>
      </Box>

      <TodoList todos={todoList} />
    </div>
  );
};
