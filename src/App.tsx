import { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer, { User } from './api/users';
import todosFromServer from './api/todos';

type Todo = {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
  user: User,
};

type Props = {
  users: (Todo[] | undefined) | undefined;
};

const getDefaultUser = (): User => ({
  id: -1,
  name: 'Unknown User',
  username: '',
  email: '',
});

const getUser = (id: number) => {
  const foundUser = usersFromServer.find((user) => (
    user.id === id));

  return foundUser || getDefaultUser();
};

const getUserFromName = (name: string) => {
  const foundUser = usersFromServer.find((user) => (
    user.name === name));

  return foundUser;
};

const visibleTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.id),
}));

export const App: React.FC<Props> = () => {
  const [name, setName] = useState('Choose a user');
  const [title, setTitle] = useState('');
  const [nameError, setNameError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [todos, setTodos] = useState(visibleTodos);

  const handleSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setName(event.target.value);
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (name === 'Choose a user') {
      setNameError(true);
    }

    if (!title) {
      setTitleError(true);
    }

    const newUser = getUserFromName(name);

    if (!newUser) {
      setNameError(true);

      return;
    }

    const newTodo: Todo = {
      id: todos.length + 1,
      title,
      completed: false,
      userId: newUser.id,
      user: newUser || undefined,
    };

    setTodos([...visibleTodos, newTodo]);
    setName('');
    setTitle('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitle}
            placeholder="Enter a Title"
          />
          <span
            id="text"
            className={titleError
              ? 'error'
              : 'error-display-none'}
          >
            Please enter a title
          </span>
        </div>

        <div className="field">
          <select
            value={name}
            data-cy="userSelect"
            onChange={handleSelection}
          >
            <option value="Choose a user" disabled>Choose a user</option>
            {usersFromServer.map((user) => (
              <option key={user.id} value={user.name}>{user.name}</option>
            ))}
          </select>

          <span
            id="selection"
            className={nameError
              ? 'error'
              : 'error-display-none'}
          >
            Please choose a user
          </span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
