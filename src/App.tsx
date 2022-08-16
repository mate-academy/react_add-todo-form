import { useState } from 'react';
import classNames from 'classnames';
import {
  Button, FormHelperText, MenuItem, Paper, Select, TextField,
} from '@mui/material';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types/Todos';
import { User } from './types/Users';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userid: number | null): User | null {
  const foundUser = usersFromServer.find(user => user.id === userid);

  return foundUser || null;
}

const getUserId = (username: string): number | null => {
  const foundId = usersFromServer.find(user => user.name === username);

  return foundId?.id || null;
};

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [user, setUser] = useState('');
  const [title, setTitle] = useState('');
  const [toDo, setToDo] = useState(todos);
  const [eror, setEror] = useState(false);

  const newId = [
    ...toDo.sort((a, b) => a.id - b.id)][todosFromServer.length - 1].id + 1;
  const newUserId = getUserId(user);
  const newUser = getUser(newUserId);
  const createTodo = () => (
    {
      id: newId,
      title,
      completed: false,
      userId: newUserId,
      user: newUser,
    }
  );

  const newEl = createTodo();
  const add = () => {
    toDo.push(newEl);

    return toDo;
  };

  return (
    <Paper
      elevation={12}
      style={{ width: '50vh', margin: '0 auto', padding: '25px' }}
    >
      <h1>Add todo form</h1>

      <form
        id="form"
        action="/api/users"
        method="Post"
        onSubmit={(event) => {
          event.preventDefault();

          if (user.trim() !== '') {
            setTitle('');
          }

          if (title.trim() !== '') {
            setUser('');
          }

          if (user.trim() !== '' && title.trim() !== '') {
            setToDo(add());
            setEror(false);
          }
        }}
      >
        <div className="field">
          <TextField
            variant="outlined"
            style={{ marginBottom: '10px', width: '100%' }}
            label="ToDo Title"
            id="text"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="enter todo title"
          />
          {eror && (
            <span
              style={{ marginBottom: '20px' }}
              // eslint-disable-next-line quote-props
              className={classNames('no-error', { 'error': title === '' })}
            >
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <Select
            id="title"
            inputProps={{ 'aria-label': 'Without label' }}
            displayEmpty
            data-cy="userSelect"
            value={user}
            onChange={(event => setUser(event.target.value))}
            style={{ width: '100%' }}
          >
            <MenuItem
              value=""
            >
              <em>Choose a user</em>
            </MenuItem>
            {usersFromServer.map(el => (
              <MenuItem
                value={el.name}
                key={el.id}
              >
                {el.name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText
            style={{ marginBottom: '10px' }}
          >
            Chose user
          </FormHelperText>
          {eror && (
            <span
              className={classNames(
                // eslint-disable-next-line quote-props
                'no-error', { 'error': user === '0' || user === '' },
              )}
            >
              Please choose a user
            </span>
          )}
        </div>

        <Button
          variant="outlined"
          color="success"
          type="submit"
          data-cy="submitButton"
          onClick={() => {
            if (user === '' || title === '') {
              setEror(true);
            }
          }}
          style={{ marginBottom: '20px' }}
        >
          Add
        </Button>
      </form>
      <div className="container">
        <TodoList todos={toDo} />
      </div>
    </Paper>
  );
};
