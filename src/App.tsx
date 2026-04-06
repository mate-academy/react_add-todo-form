import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { useState } from 'react';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const todos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: {
    id: number;
    name: string;
    username: string;
    email: string;
  } | null;
};

export const App = ({ onSubmit }: { onSubmit?: (todo: Todo) => void }) => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [userId, setUserId] = useState(0);
  const [hasUserError, setHasUserError] = useState(false);
  const [newTodos, setNewTodos] = useState(todos);

  const handleSubmit = (formEvent: React.FormEvent<HTMLFormElement>) => {
    formEvent.preventDefault();

    const titleError = !title;
    const userError = userId === 0;

    setHasTitleError(titleError);
    setHasUserError(userError);

    if (titleError || userError) {
      return;
    }

    const maxId = Math.max(...newTodos.map(todo => todo.id), 0);

    const newTodo: Todo = {
      title,
      user: getUserById(userId),
      userId,
      id: maxId + 1,
      completed: false,
    };

    setNewTodos([...newTodos, newTodo]);

    if (onSubmit) {
      onSubmit(newTodo);
    }

    setTitle('');
    setUserId(0);
  };

  const handleTitleChange = (
    titleEvent: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTitle(titleEvent.target.value);
    setHasTitleError(false);
  };

  const handleUserChange = (
    userEvent: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setUserId(+userEvent.target.value);
    setHasUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title</label>
          <input
            id="titleInput"
            type="text"
            placeholder="Add a title"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User</label>
          <select
            id="userSelect"
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
          >
            <option value="0" disabled selected>
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={newTodos} />
    </div>
  );
};
