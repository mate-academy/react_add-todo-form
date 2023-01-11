import { useState } from 'react';
import './App.scss';

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { User } from './type/User';
import { Todos } from './type/Todos';

function getUserById(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const todosWithUsers: Todos[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(todosWithUsers);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [titleCorrect, setTitleCorrect] = useState(true);
  const [userIdCorrect, setUserIdCorrect] = useState(true);

  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleCorrect(true);
  };

  const changeUserId = (event: SelectChangeEvent) => {
    setUserId(event.target.value);
    setUserIdCorrect(true);
  };

  const handleSubmit = (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title || !userId) {
      setTitleCorrect(false);
      setUserIdCorrect(false);

      return;
    }

    if (userId && title) {
      const id = Math.max(...todos.map(todo => todo.id));

      const newTodo: Todos = {
        title,
        userId: +userId,
        completed: false,
        id: id + 1,
        user: getUserById(+userId),
      };

      setTodos(prev => [...prev, newTodo]);
      setTitle('');
      setUserId('');
    }
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
            sx={{ width: '200px' }}
            id="outlined-basic"
            label="Title"
            variant="outlined"
            value={title}
            onChange={changeTitle}
            error={!titleCorrect}
          />
        </div>

        <div className="field">
          <FormControl fullWidth>
            <InputLabel
              id="demo-simple-select-label"
              error={!userIdCorrect}
            >
              User
            </InputLabel>
            <Select
              sx={{ width: '200px' }}
              data-cy="userSelect"
              value={userId}
              onChange={changeUserId}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="User"
              error={!userIdCorrect}
            >
              {usersFromServer.map((person) => (
                <MenuItem
                  value={person.id}
                  key={person.id}
                >
                  {person.name}
                </MenuItem>
              ))}
            </Select>
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
