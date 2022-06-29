import React, { useCallback, useState } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import {
  Box,
  Button, FormControl,
  Grid, InputLabel, MenuItem, Select, SelectChangeEvent,
  TextField,
} from '@mui/material';
import users from './api/users';
import Todo from './components/Todo';
import todos from './api/todos';
import { ITodo } from './modules/models';

const App: React.FC = () => {
  const [myTodos, setMyTodos] = useState<ITodo[]>([]);
  const getTodosHandler = useCallback(() => {
    setMyTodos(todos);
  }, [todos]);
  const removeTodo = useCallback((id) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    setMyTodos(myTodos => myTodos.filter(t => t.id !== id));
  }, []);

  const [selectedUser, setSelectedUser] = React.useState('');
  const [newTodo, setNewTodo] = useState<ITodo>({
    userId: '',
    id: '',
    title: '',
    completed: false,
  });
  const onChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const candidate = {
        userId: selectedUser,
        id: uuidv4(),
        title: e.target.value,
        completed: false,
      };

      setNewTodo(candidate);
    }, [uuidv4],
  );

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedUser(event.target.value as string);
  };

  const addTodoHandler = useCallback(() => {
    const addTodo = [...myTodos, newTodo];

    setMyTodos(addTodo);
  }, [myTodos, newTodo]);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <Button
        variant="contained"
        color="success"
        onClick={getTodosHandler}
      >
        Get Todos
      </Button>

      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="standard-basic"
          label="Title"
          variant="standard"
          value={newTodo.title}
          onChange={onChangeHandler}
        />
      </Box>

      <Box sx={{ maxWidth: 200, margin: '0 auto' }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Users</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedUser}
            label="Users"
            onChange={handleChange}
          >
            {/* <MenuItem value={10}>Ten</MenuItem> */}
            {users.map((u: any) => (
              <MenuItem
                value={u.username}
                key={u.id}
              >
                {u.username}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: 13 }}
        onClick={addTodoHandler}
      >
        Add Todo
      </Button>

      <Grid container>
        {myTodos.map((todo) => (
          <Grid item xs key={todo.id}>
            <Todo
              onClick={removeTodo}
              id={todo.id}
              title={todo.title}
              userId={todo.userId}
              completed={todo.completed}
            />
          </Grid>
        ))}
      </Grid>
      <p>
        <span>Users: </span>
        {users.length}
      </p>
    </div>
  );
};

export default App;
