import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { User } from './components/UserInfo';
import { Todo } from './components/TodoInfo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  // if there is no user with a given userId
  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [pickUserError, setPickUserError] = useState(false);
  const [pickedUser, pickUser] = useState(0);
  const [actualTodos, setTodos] = useState(todos);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newId = Math.max(...todos.map(todo => todo.id)) + 1;

    const addedTodo: Todo = {
      id: newId,
      completed: false,
      user: getUser(Number(pickedUser)),
      title: title.trim(),
      userId: Number(pickedUser),
    };

    if (!title) {
      setTitleError(true);
    }

    if (!pickedUser) {
      setPickUserError(true);
    }

    if (!pickedUser || !title) {
      return;
    }

    setTodos([...actualTodos, addedTodo]);
    setTitle('');
    pickUser(0);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    if (name === 'title') {
      setTitle(value);
      setTitleError(false);
    } else {
      pickUser(Number(value));
      setPickUserError(false);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <input
            name="title"
            type="text"
            value={title}
            data-cy="titleInput"
            placeholder="Enter a title"
            onChange={handleChange}
          />

          {titleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={pickedUser}
            onChange={handleChange}
          >
            <option value="0">Choose a user</option>
            {usersFromServer.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {pickUserError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={actualTodos} />
    </div>
  );
};
