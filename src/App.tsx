import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { useState } from 'react';

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export type RawTodo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

export type TodoWithUser = RawTodo & {
  user?: User;
};

function getUserById(users: User[], userId: number): User | undefined {
  return users.find(user => user.id === userId);
}

export const initialTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(usersFromServer, todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [currentTodos, setCurrentTodos] =
    useState<TodoWithUser[]>(initialTodos);

  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleReset = () => {
    setTitle('');
    setSelectedUserId('');
    setTitleError(false);
    setUserError(false);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    if (titleError) {
      setTitleError(false);
    }
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(event.target.value);
    if (userError) {
      setUserError(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let hasError = false;

    if (title.trim() === '') {
      setTitleError(true);
      hasError = true;
    }

    if (selectedUserId === '') {
      setUserError(true);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const numericUserId = Number(selectedUserId);
    const newId =
      currentTodos.length > 0
        ? Math.max(...currentTodos.map(todo => todo.id)) + 1
        : 1;

    const newTodo: TodoWithUser = {
      id: newId,
      title,
      completed: false,
      userId: numericUserId,
      user: getUserById(usersFromServer, numericUserId),
    };

    setCurrentTodos([...currentTodos, newTodo]);
    handleReset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            id="titleInput"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter a title"
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>
        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            id="userSelect"
            data-cy="userSelect"
            value={selectedUserId}
            onChange={handleUserChange}
          >
            <option value="">Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={currentTodos} />
    </div>
  );
};
