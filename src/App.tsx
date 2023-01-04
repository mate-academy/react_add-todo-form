import { FC, FormEvent, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import './App.scss';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';

const getUserById = (id: number) => (
  usersFromServer.find(user => user.id === id) || null
);

const createNewTodo = (id: number, title: string, userId: number): Todo => ({
  id,
  title,
  completed: false,
  userId,
  user: getUserById(userId),
});

const preparedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: FC = () => {
  const [todos, setTodos] = useState(preparedTodos);
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUser] = useState(0);
  const [titleErrorStatus, setTitleError] = useState(false);
  const [userErorStatus, setUserError] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (title.trim() === '' || selectedUserId === 0) {
      setTitleError(title.trim() === '');
      setUserError(selectedUserId === 0);

      return;
    }

    const nextId = Math.max(...todos.map(todo => todo.id)) + 1;

    setTodos(prevTodos => ([
      ...prevTodos,
      createNewTodo(nextId, title, selectedUserId),
    ]));

    setTitle('');
    setSelectedUser(0);
  };

  const handteTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleUserChange = (event: SelectChangeEvent) => {
    setSelectedUser(Number(event.target.value));
    setUserError(false);
  };

  return (
    <div className="App">
      <div className="App__content">
        <h1>Add todo form</h1>

        <form className="App__form" onSubmit={handleSubmit}>
          <div className="App__form-field">
            <TextField
              className="App__form-input"
              type="text"
              id="outlined-basic"
              label="Title"
              variant="outlined"
              data-cy="titleInput"
              value={title}
              onChange={handteTitleChange}
              error={titleErrorStatus}
            />
            {titleErrorStatus && (
              <span className="App__form-eror error">Please enter a title</span>
            )}
          </div>

          <div className="App__form-field">
            <FormControl fullWidth>
              <Select
                data-cy="userSelect"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={String(selectedUserId)}
                onChange={handleUserChange}
                error={userErorStatus}
              >
                <MenuItem value={0} disabled>Choose a user</MenuItem>
                {usersFromServer.map(({ id, name }) => (
                  <MenuItem key={id} value={id}>{name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            {userErorStatus && (
              <span className="App__form-eror error">Please choose a user</span>
            )}
          </div>

          <div className="App__form-btn">
            <Button
              variant="contained"
              type="submit"
              data-cy="submitButton"
              style={{ minWidth: '150px' }}
            >
              Add
            </Button>
          </div>
        </form>

        <TodoList todos={todos} />
      </div>
    </div>
  );
};
