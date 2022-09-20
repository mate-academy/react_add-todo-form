import { useState } from 'react';

import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from '../types/User';
import { Todo } from '../types/Todo';
import { TodoList } from './components/TodoList/index';

function getUser(userId: number): User | null {
  const foundedUser = usersFromServer.find(user => user.id === userId);

  return foundedUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [validTitle, setValidTitle] = useState(false);
  const [userId, setUserId] = useState(0);
  const [validUser, setValidUser] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const maxId = Math.max(...todos.map(todo => todo.id));

    const newTodo = {
      id: maxId + 1,
      title,
      completed: false,
      userId,
      user: getUser(userId),
    };

    if (!userId) {
      setValidUser(true);
    }

    if (!title.trim()) {
      setValidTitle(true);
    }

    if (userId && title.trim()) {
      todos.push(newTodo);
      setUserId(0);
      setTitle('');
      setValidUser(false);
      setValidTitle(false);
    }
  };

  type Props =
    React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>;

  const setFieldValue = (event: Props) => {
    const { name, value } = event.target;

    switch (name) {
      case 'title':
        setTitle(value);
        setValidTitle(false);

        break;

      case 'userId':
        setUserId(+value);
        setValidUser(false);

        break;

      default:
        throw new Error(`The title cannot start with a space.
        Enter a valid title and select a user`);
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
          <label>
            {'Title: '}
            <input
              type="text"
              name="title"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={setFieldValue}
            />
          </label>

          {validTitle && <span className="error">Please enter a title</span>}

        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={userId}
              name="userId"
              onChange={setFieldValue}
            >
              <option value="0" disabled>Choose a user</option>

              {usersFromServer.map(({ id, name }) => {
                return (
                  <option
                    value={id}
                    key={id}
                  >
                    {name}
                  </option>
                );
              })}
            </select>
          </label>

          {validUser && <span className="error">Please choose a user</span>}

        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />

    </div>
  );
};
