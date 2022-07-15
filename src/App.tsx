import React, { useCallback, useReducer, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

import {
  Box,
  Button,
  FormGroup,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
  TextField,
  Select,
} from '@mui/material';
import TodoCard from './components/TodoCard';
import { audioClick } from './assets/audio/audio';

import users from './api/users';
import {
  ActionType,
  initialUser,
  Todo,
  User,
} from './models/models';
import todos from './api/todos';

const initialState = todos;

const App: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [helperText, setHelperText] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<User>(initialUser);

  function reducer(state: Todo[] = initialState, action: ActionType) {
    switch (action.type) {
      case 'REMOVE':
        return state.filter((todo) => todo.id !== action.payload);
      case 'COMPLETED':
        // eslint-disable-next-line no-case-declarations
        const index = state.findIndex((todo) => todo.id === action.payload);
        // eslint-disable-next-line no-case-declarations
        const completedTodo = {
          ...state[index],
          completed: !state[index].completed,
        };
        // eslint-disable-next-line no-case-declarations
        const newState = [...state];

        newState[index] = completedTodo;

        return newState;
      case 'SUBMIT':
        // eslint-disable-next-line no-case-declarations,@typescript-eslint/no-non-null-assertion

        if (username) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const candidate: User = users.find((u) => u.username === username)!;

          setSelectedUser(candidate);
        }

        // eslint-disable-next-line no-case-declarations
        const newTodo: Todo = {
          id: uuidv4(),
          title,
          userId: selectedUser.id,
          completed: false,
        };

        return [...state, newTodo];
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const onDeleteHandler = useCallback((id) => {
    audioClick.play();
    dispatch({ type: 'REMOVE', payload: id });
  }, []);

  const onCompleteHandler = useCallback((id) => {
    audioClick.play();
    dispatch({ type: 'COMPLETED', payload: id });
  }, []);

  const onSubmitHandler = useCallback((e) => {
    e.preventDefault();
    if (!title) {
      setHelperText('Please enter your title');

      return;
    }

    const correctTitle = title.replace(/[^\w\d\s\u0430-\u044f]+/, '');

    if (!correctTitle) {
      setHelperText('Please use correct symbols');

      return;
    }

    audioClick.play();
    dispatch({ type: 'SUBMIT' });
    setTimeout(() => {
      setTitle('');
      setHelperText('');
      setUsername('');
    }, 1000);
  }, [dispatch, title]);

  const onChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setTitle(e.target.value);
    },
    [],
  );

  const handleChange = (event: SelectChangeEvent) => {
    setUsername(event.target.value as string);
  };

  return (
    <Box
      maxWidth="620px"
      display="flex"
      p={2}
      flexDirection="column"
      sx={{ margin: '0 auto', transition: '2s ease-in-out' }}
    >
      <FormGroup>
        <TextField
          sx={{ width: '100%', background: '#fff', margin: '5px auto' }}
          label="title"
          value={title}
          variant="filled"
          helperText={helperText}
          onChange={onChangeHandler}
        />
        <InputLabel id="demo-simple-select-label">Choose a user</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={username}
          label="Choose a user"
          onChange={handleChange}
        >
          {users.map((u) => (
            <MenuItem value={u.username} key={u.id}>
              {' '}
              {u.username}
            </MenuItem>
          ))}
        </Select>
        <Button
          onClick={onSubmitHandler}
          sx={{ margin: '5px auto', width: 100 }}
          color="primary"
          size="small"
          variant="contained"
          disabled={!username}
        >
          Add Task
        </Button>
      </FormGroup>
      {state.map((todo) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          onClick={onDeleteHandler}
          onComplete={onCompleteHandler}
        />
      ))}
    </Box>
  );
};

export default App;
