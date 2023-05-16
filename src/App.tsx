import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './Type/User';
import { Todo } from './Type/Todo';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  // if there is no user with a given userId
  return foundUser || null;
}

export const getTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC<{}> = () => {
  const [title, setTitle] = useState('');
  const [user, setUser] = useState<string>('');
  const [todos, setTodos] = useState(getTodos);
  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let isValid = true;

    if (!title.trim() || title.trim().length === 0) {
      setTitleError('Please enter a title');
      isValid = false;
    }

    if (!user) {
      setUserError('Please choose a user');
      isValid = false;
    }

    if (isValid) {
      const newTodoId = todos.reduce(
        (maxId, todo) => Math.max(maxId, todo.id), 0,
      ) + 1;

      const newTodo: Todo = {
        id: newTodoId,
        title: title.trim(),
        userId: Number(user),
        completed: false,
        user: getUser(Number(user)),
      };

      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setTitle('');
      setUser('');
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
          <label htmlFor="title">
            Title:
          </label>
          <input
            type="text"
            id="title"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              setTitleError('');
            }}
          />
          {titleError && <span className="error">{titleError}</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">
            Choose a user:
          </label>
          <select
            id="userSelect"
            data-cy="userSelect"
            value={user}
            onChange={(event) => {
              setUser(event.target.value);
              setUserError('');
            }}
            defaultValue=""
          >
            <option value="" disabled>Choose a user</option>
            {usersFromServer.map((userSelect) => (
              <option key={userSelect.id} value={userSelect.id}>
                {userSelect.name}
              </option>
            ))}
          </select>
          {userError && <span className="error">{userError}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />

    </div>
  );
};
