import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUserById(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  // if there is no user with a given userId
  return foundUser || null;
}

export const getTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userSelect, setUserSelect] = useState(0);
  const [userError, setUserError] = useState(false);
  const [todos, setTodos] = useState(getTodos);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTodoId = Math.max(...todos.map(todo => todo.id)) + 1;

    if (!userSelect) {
      setUserError(true);
    }

    if (!title) {
      setTitleError(true);
    }

    if (!title || !userSelect) {
      return;
    }

    const newTodo = {
      id: newTodoId,
      completed: false,
      user: getUserById(Number(userSelect)),
      title: title.trim(),
      userId: Number(userSelect),
    };

    setTodos([...todos, newTodo]);

    setUserSelect(0);
    setTitle('');
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    if (name === 'title') {
      setTitle(value);
      setTitleError(false);
    } else {
      setUserSelect(+value);
      setUserError(false);
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
          <label htmlFor="titleInput">
            Title:
          </label>
          <input
            type="text"
            name="title"
            id="title"
            data-cy="titleInput"
            placeholder="Title"
            value={title}
            onChange={handleChange}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User:</label>
          <select
            data-cy="userSelect"
            name="user"
            id="user"
            value={userSelect}
            onChange={handleChange}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map((userName) => (
              <option key={userName.id} value={userName.id}>
                {userName.name}
              </option>
            ))}
          </select>
          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
