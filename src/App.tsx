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

type Event = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent;

class App extends React.Component<{}, State> {
  state = {
    currTodos: [...todos],
    title: '',
    selectedUserId: '',
  };

  addValue = (event: Event) => {
    const { name, value } = event.target;

    this.setState((state) => ({
      ...state,
      [name]: value,
    }));
  };

  clearForm = () => {
    this.setState({
      title: '',
      selectedUserId: '',
    });
  };

  createNewTodo = (
    selectedUserId: string,
    currTodos: Todo[],
    title: string,
  ) => {
    const sortedTodoIds = currTodos.map(todo => todo.id).sort((a, b) => b - a);

    const Todo: Todo = {
      userId: +selectedUserId,
      id: sortedTodoIds[0] + 1,
      title,
      completed: false,
    };

    return Todo;
  };

  getVisibleTodos = (currTodos:Todo[]): VisibleTodo[] => (
    currTodos.map(todo => ({
      ...todo,
      user: users.find((user) => user.id === todo.userId) || null,
    }))
  );

  submitForm = (event: React.FormEvent) => {
    event.preventDefault();

    const {
      selectedUserId,
      currTodos,
      title,
    } = this.state;

    const newTodo = this.createNewTodo(
      selectedUserId,
      currTodos,
      title,
    );

    this.setState((state) => ({
      currTodos: [...state.currTodos, newTodo],
    }));

    this.clearForm();
  };

  render() {
    const {
      selectedUserId,
      currTodos,
      title,
    } = this.state;

    const visibleTodos = this.getVisibleTodos(currTodos);

    return (
      <div className="App">
        <TodoList visibleTodos={visibleTodos} />
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
            id="title"
            name="title"
            label="Add ToDo title"
            required
            variant="outlined"
            value={title}
            onChange={this.addValue}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Select User</InputLabel>
            <Select
              name="selectedUserId"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedUserId}
              label="Select User"
              required
              onChange={this.addValue}
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
