import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';

import { TodoList } from './TodoList/TodoList';

import './App.css';

import users from './api/users';
import todos from './api/todos';

type State = {
  currTodos: Todo[];
  title: string;
  selectedUserId: string;
};

class App extends React.Component<{}, State> {
  state = {
    currTodos: todos,
    title: '',
    selectedUserId: '',
  };

  addTodoTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ title: event.target.value });
  };

  addUser = (event: SelectChangeEvent) => {
    this.setState({ selectedUserId: String(event.target.value) });
  };

  submitForm = (event: React.FormEvent) => {
    const {
      selectedUserId,
      currTodos,
      title,
    } = this.state;

    const sortedTodoIds = currTodos.map(todo => todo.id).sort((a, b) => b - a);

    const newTodo: Todo = {
      userId: Number(selectedUserId),
      id: sortedTodoIds[0] + 1,
      title,
      completed: false,
    };

    this.setState((state) => ({
      currTodos: [...state.currTodos, newTodo],
    }));

    this.setState({ title: '' });
    this.setState({ selectedUserId: '' });

    event.preventDefault();
  };

  render() {
    const {
      selectedUserId,
      currTodos,
      title,
    } = this.state;
    const visibleTodo: VisibleTodo[] = currTodos.map(todo => ({
      ...todo,
      user: users.find((user) => user.id === todo.userId) || null,
    }));

    return (
      <div className="App">
        <TodoList currTodos={visibleTodo} />
        <Box
          className="App__form"
          onSubmit={this.submitForm}
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '45ch' },
          }}
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Add ToDo title"
            required
            variant="outlined"
            value={title}
            onChange={this.addTodoTitle}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Select User</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedUserId}
              label="Select User"
              required
              onChange={this.addUser}
            >
              {users.map(user => (
                <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
              ))}

            </Select>
          </FormControl>
          <Button
            type="submit"
            className="App__form-button"
            variant="outlined"
          >
            Add
          </Button>
        </Box>
      </div>
    );
  }
}

export default App;
