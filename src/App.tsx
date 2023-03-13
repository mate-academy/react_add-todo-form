import {
  ChangeEvent,
  FC,
  FormEvent,
  useState,
} from 'react';

import './App.scss';
import {
  Box,
  Paper,
  TextField,
  Select,
  MenuItem,
  SelectChangeEvent,
  Button,
} from '@mui/material';

import usersFromServer from './api/users';
import { getUser, todos, getTodoNewId } from './helpers/helpers';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

export const App: FC = () => {
  const [title, setTitle] = useState('');
  const [selectedUser, setselectedUser] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [todoList, setTodoList] = useState(todos);

  const handleClear = () => {
    setTitle('');
    setselectedUser('');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      setTitleError(true);
    }

    if (!selectedUser) {
      setUserError(true);
    }

    if (title && selectedUser) {
      const newTodo: Todo = {
        id: getTodoNewId(todos),
        title,
        userId: Number(selectedUser),
        completed: false,
        user: getUser(Number(selectedUser)),
      };

      setTodoList([...todoList, newTodo]);

      handleClear();
    }
  };

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleChangeUser = (event: SelectChangeEvent) => {
    setselectedUser(event.target.value);
    setUserError(false);
  };

  return (
    <div className="App">
      <Paper
        elevation={3}
        sx={{
          width: 'max-content',
          margin: 'auto',
          padding: 3,
          backgroundColor: '#e1f5fe',
        }}
      >
        <Box>
          <h1 className="title">Add todo form</h1>

          <form
            action="/api/users"
            method="POST"
            onSubmit={handleSubmit}
          >
            <div className="field">
              <TextField
                sx={{ width: 300 }}
                label="Enter a title"
                type="text"
                autoComplete="off"
                value={title}
                onChange={handleChangeTitle}
              />

              {titleError && (
                <div className="error">Please enter a title</div>
              )}
            </div>

            <div className="field">
              <Select
                sx={{ width: 300 }}
                displayEmpty
                value={selectedUser}
                onChange={handleChangeUser}
              >
                <MenuItem value="" disabled>
                  Choose a user
                </MenuItem>

                {usersFromServer.map(({ id, name }) => (
                  <MenuItem value={id} key={id}>
                    {name}
                  </MenuItem>
                ))}
              </Select>

              {userError && (
                <div className="error">Please choose a user</div>
              )}
            </div>

            <Button
              sx={{ width: 300 }}
              variant="contained"
              type="submit"
            >
              Add
            </Button>
          </form>

          <TodoList todos={todoList} />
        </Box>
      </Paper>
    </div>
  );
};
