import { useState, useEffect } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

function getUserByName(userName: string): User | null {
  const foundUser = usersFromServer.find(user => user.name === userName);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

type ChangeEvent = React.ChangeEvent<HTMLSelectElement | HTMLInputElement>;
export const App: React.FC = () => {
  const [errorName, setErrorName] = useState(false);
  const [errorTitle, setErrorTitle] = useState(false);
  const [visibleTodos, setVisibleTodos] = useState(todos);
  const [values, setValues] = useState({
    user: '',
    title: '',
    id: 16,
    completed: false,
  });
  const [todo, setTodo] = useState<Todo>({
    id: 0,
    userId: 0,
    title: '',
    completed: false,
    user: null,
  });

  const handleChange = (e: ChangeEvent) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { user, title } = values;

    if (!user || !title) {
      setErrorName(Boolean(!user));
      setErrorTitle(Boolean(!title));

      return;
    }

    if (user === '0') {
      setErrorName(true);

      return;
    }

    if (title.trim().length === 0) {
      setErrorTitle(Boolean(title));

      return;
    }

    setValues({
      ...values,
      user: '',
      title: '',
      id: values.id + 1,
    });

    setVisibleTodos([
      ...visibleTodos,
      todo,
    ]);
  };

  useEffect(() => {
    const user = getUserByName(values.user);

    if (values.user.length > 0) {
      setErrorName(false);
    } else if (values.title.length > 0) {
      setErrorTitle(false);
    }

    setTodo({
      ...todo,
      id: values.id,
      userId: user !== null ? user.id : 0,
      title: values.title,
      completed: values.completed,
      user: getUserByName(values.user),
    });
  }, [values.title, values.user]);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label>
            Title:
            {' '}
            <input
              type="text"
              data-cy="titleInput"
              name="title"
              value={values.title}
              onChange={handleChange}
              placeholder="Please enter a title"
            />
          </label>
          {errorTitle && <span className="error">Please enter a title</span>}

        </div>

        <div className="field">
          <label>
            User:
            {' '}
            <select
              data-cy="userSelect"
              name="user"
              value={values.user}
              onChange={handleChange}
            >
              <option value="0">Choose a user</option>
              {usersFromServer.map(user => (
                <option
                  value={user.name}
                  key={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          {errorName && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
