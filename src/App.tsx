import './App.scss';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FormEvent, useState } from 'react';
import { TodoList } from './components/TodoList/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types';

export const App = () => {
  const getUser = (userId: number) => {
    const foundedUser = usersFromServer.find(user => user.id === userId);

    return foundedUser || null;
  };

  const todosWithUsers = todosFromServer.map((todo) => ({
    ...todo,
    user: getUser(todo.userId),
  }));

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('0');
  const [todos, setTodos] = useState(todosWithUsers);
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectorError, setSelectorError] = useState(false);
  const [titleError, setTitleError] = useState(false);

  const createTodo = (
    currentTitle: string,
    currentUserId: string,
    currentIsCompleted: boolean,
  ) => {
    const createdTodo: Todo = {
      id: Math.max(...todos.map(el => el.id)) + 1,
      title: currentTitle,
      completed: currentIsCompleted,
      userId: Number(currentUserId),
      user: usersFromServer.find(person => (
        person.id === Number(currentUserId))) || null,
    };

    setTodos([
      ...todos,
      createdTodo,
    ]);
  };

  const handleSelector = (value: string) => {
    setUserId(value);
    setSelectorError(false);
  };

  const handleTitle = (value: string) => {
    setTitle(value);
    if (title === '') {
      setTitleError(false);
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (title.trim() === '') {
      setTitleError(true);
    }

    if (userId === '0') {
      setSelectorError(true);
    }

    if (title.trim() !== '' && userId !== '0') {
      createTodo(title, userId, isCompleted);
      setTitle('');
      setUserId('0');
      setIsCompleted(false);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => handleSubmit(event)}
      >
        <div className="field">
          <Input
            placeholder="Please enter a title"
            data-cy="titleInput"
            value={title}
            onChange={event => handleTitle(event.target.value)}
          />
          {titleError && (
            <span className="error">
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <Select
            data-cy="userSelect"
            value={userId}
            onChange={event => handleSelector(event.target.value)}
          >
            <MenuItem value="0" disabled>Choose a user</MenuItem>

            {usersFromServer.map((person) => (
              <MenuItem value={person.id} key={person.id}>
                {person.name}
              </MenuItem>
            ))}
          </Select>
          {selectorError && (
            <span className="error">
              Please choose a user
            </span>
          )}
        </div>

        <div className="field">
          <label>
            <input
              type="checkbox"
              onClick={() => setIsCompleted(!isCompleted)}
            />
            Completed
          </label>
        </div>
        <Button
          type="submit"
          data-cy="submitButton"
          variant="outlined"
        >
          Add
        </Button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
