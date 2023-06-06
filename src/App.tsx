import './App.scss';

import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

function getName(name: string): User | null {
  const foundName = usersFromServer.find(user => user.name === name);

  return foundName || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [newTodos, setTodos] = useState<Todo[]>(todos);
  const [title, setTitle] = useState('');
  const [userName, setUserName] = useState('');
  const [titleErrorMessage, setTitleError] = useState(true);
  const [userErrorMessage, setUserError] = useState(true);

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const maxId = Math.max(...newTodos.map((todo) => todo.id));
    const newUser = getName(userName);

    const newTodo: Todo = {
      id: maxId + 1,
      title,
      completed: false,
      userId: newUser ? newUser.id : null,
      user: newUser,
    };

    setTitleError(Boolean(title.trim()));
    setUserError(Boolean(userName));

    if (!title || !userName) {
      return;
    }

    setTodos((prevTodos) => [...prevTodos, newTodo]);

    setTitle('');
    setUserName('');
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement
  | HTMLSelectElement>
    = (event) => {
      const { id, value } = event.target;

      switch (id) {
        case 'title':
          setTitle(value.replace(/[^a-zA-Zа-яА-ЯїЇіІєЄёЁ0-9\s]+/g, ''));
          setTitleError(Boolean(value));
          break;

        case 'user':
          setUserName(value);
          setUserError(Boolean(value));
          break;

        default:
          throw new Error(`Can not find id of ${id}`);
      }
    };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleOnSubmit}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>

          <input
            type="text"
            data-cy="titleInput"
            id="title"
            placeholder="Enter a title"
            value={title}
            onChange={handleChange}
          />

          {!titleErrorMessage
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>

          <select
            data-cy="userSelect"
            id="user"
            value={userName}
            onChange={handleChange}
          >
            <option
              value=""
              disabled
            >
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option value={user.name} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {!userErrorMessage
            && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={newTodos} />
    </div>
  );
};
