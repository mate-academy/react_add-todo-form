import React, { useEffect, useState } from 'react';
import './App.css';
import {
  Grid,
  Button,
  Select,
  MenuItem,
  TextField,
  FormControl,
} from '@mui/material';
import users from './api/users';
import todos from './api/todos';
import { TodoList } from './TodoList/TodoList';
import { Todo } from './Types';

const App: React.FC = () => {
  const [titleValue, setTitleValue] = useState('');
  const [newTodos, setNewTodos] = useState(todos);
  const [userIdSelected, setUserIdSelected] = useState(0);
  const [userIsSelected, setUserIsSelected] = useState<boolean>();
  const [titleIsAdd, setTitleIsAdd] = useState<boolean>();

  const preparedTodos:Todo[] = newTodos.map(todo => ({
    ...todo,
    userInfo: users.find(userItem => userItem.id === todo.userId) || null,
  }));

  const addToDo = () => {
    // eslint-disable-next-line
    userIdSelected
      ? setUserIsSelected(true)
      : setUserIsSelected(false);
    // eslint-disable-next-line
    titleValue
      ? setTitleIsAdd(true)
      : setTitleIsAdd(false);

    if (!titleValue) {
      return;
    }

    setNewTodos(() => [...newTodos, {
      userId: userIdSelected,
      id: newTodos.length + 1,
      title: titleValue,
      completed: false,
    }]);

    setUserIdSelected(0);
    setTitleValue('');
  };

  useEffect(() => {
    // eslint-disable-next-line
    userIdSelected && setUserIsSelected(true);
    // eslint-disable-next-line
    titleValue && setTitleIsAdd(true);
  }, [userIdSelected, titleValue]);

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <div>
        <FormControl sx={{
          maxWidth: '500px',
          margin: 'auto',
        }}
        >

          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={3}
          >
            <Grid item xs>
              <Select
                value={userIdSelected}
                sx={{
                  width: '150px',
                }}
                onChange={(event) => {
                  setUserIdSelected(+event.target.value);
                }}
              >

                <MenuItem value={0}>Choose a user</MenuItem>
                {users.map(user => {
                  const { id } = user;

                  return (
                    <MenuItem
                      value={id}
                      key={id}
                    >
                      {id}
                    </MenuItem>
                  );
                })}
              </Select>
              {userIsSelected === false
                ? <p className="alert">Please choose a user</p>
                : null}

            </Grid>

            <Grid item xs={6}>
              <TextField
                type="text"
                variant="outlined"
                label="Enter your name"
                value={titleValue}
                onChange={(event) => {
                  setTitleValue(event.target.value);
                }}
              />

              {titleIsAdd === false
                ? <p className="alert">Please enter the title</p>
                : null}
            </Grid>

            <Grid item xs>
              <Button
                variant="outlined"
                onClick={(event) => {
                  event.preventDefault();
                  addToDo();
                }}
              >
                Add
              </Button>
            </Grid>
          </Grid>

        </FormControl>

        <TodoList preparedTodos={preparedTodos} />

      </div>
    </div>
  );
};

export default App;
