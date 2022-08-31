import './App.scss';
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';

import { useState } from 'react';
import Button from '@mui/material/Button';
import { TodoList } from './components/TodoList/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Task } from './types/Task';

const tasksFromServer: Task[] = todosFromServer.map(todo => {
  const user = usersFromServer
    .find(serverUser => serverUser.id === todo.userId) || usersFromServer[0];

  return {
    ...todo,
    user,
  };
});

export const App = () => {
  const storageItemsCount: number
    = JSON.parse(localStorage.getItem('tasks') || '{}').length;
  const storageSavedTasks: Task[]
    = JSON.parse(localStorage.getItem('tasks') || '{}');

  const [tasks, setTasks] = useState(storageItemsCount > 3
    ? storageSavedTasks
    : tasksFromServer);
  const [titleTask, setTitleTask] = useState('');
  const [taskOwnerName, setTaskOwnerName] = useState('0');
  const [taskOwnerId, setTaskOwnerId] = useState(0);
  const [taskOwner, setTaskOwner] = useState<User | {}>({});
  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const [isTaskOwnerEmpty, setIsTaskOwnerEmpty] = useState(false);
  const [isTasksSaved, setIsTasksSaved] = useState(true);

  function getUserById(id = 0): User {
    return usersFromServer.find(user => user.id === id) || usersFromServer[0];
  }

  function selectTaskOwner(event: SelectChangeEvent<string>) {
    setIsTaskOwnerEmpty(false);
    setTaskOwnerName(event.target.value);
    setTaskOwner({
      ...usersFromServer
        .find(user => user.name === event.target.value) || usersFromServer[0],
    });
    const uId = usersFromServer.find(user => user.name === event.target.value)
      || usersFromServer[0];

    setTaskOwnerId(uId.id);
  }

  function getNextId(addedTasks: Task[]): number {
    return Math.max(...addedTasks.map(task => task.id)) + 1;
  }

  function addNewTask() {
    if (titleTask.trim().length !== 0 && Object.keys(taskOwner).length > 0) {
      const currentUser = getUserById(taskOwnerId);
      const newTask: Task = {
        id: getNextId(tasks),
        title: titleTask,
        completed: false,
        userId: currentUser.id,
        user: { ...currentUser },
      };

      setTasks((prevTasks) => {
        return [
          newTask,
          ...prevTasks,
        ];
      });
      setTaskOwnerName('0');
      setTitleTask('');
      setTaskOwner({});
    } else {
      setTitleTask('');
      setIsTitleEmpty(titleTask.length === 0);
      setIsTaskOwnerEmpty(Object.keys(taskOwner).length === 0);
    }
  }

  if (isTasksSaved && tasks.length > tasksFromServer.length) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } else {
    localStorage.clear();
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <Grid container spacing={4}>
        <Grid item xs={8}>
          <Paper>
            <TodoList tasks={tasks} />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper>
            <form
              action="/api/users"
              method="POST"
              onSubmit={(event) => {
                addNewTask();
                event.preventDefault();
              }}
            >
              <div className="field">
                <TextField
                  fullWidth
                  label="Enter task title"
                  value={titleTask}
                  helperText={isTitleEmpty && 'Please enter a title'}
                  onChange={(event) => {
                    setTitleTask(event.target.value);
                    setIsTitleEmpty(false);
                  }}
                />
              </div>

              <div className="field">
                <FormControl fullWidth>
                  <InputLabel>Task Owner</InputLabel>
                  <Select
                    data-cy="userSelect"
                    value={taskOwnerName}
                    label="Task Owner"
                    onChange={(event) => {
                      selectTaskOwner(event);
                    }}
                  >
                    <MenuItem value="0">Choose a user</MenuItem>
                    {usersFromServer.map(user => (
                      <MenuItem
                        key={user.id}
                        value={user.name}
                      >
                        {user.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {isTaskOwnerEmpty
                  && <span className="error">Please choose a user</span>}
              </div>
              <label>
                Save your tasks?
                <input
                  type="checkbox"
                  checked={isTasksSaved}
                  onChange={() => (
                    setIsTasksSaved(!isTasksSaved)
                  )}
                />
              </label>

              <Button
                type="submit"
                data-cy="submitButton"
                size="medium"
                variant="contained"
              >
                Add new task
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
