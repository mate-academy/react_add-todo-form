import './App.scss';

import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

function getUserById(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

function getUserByName(name: string): User | null {
  const foundName = usersFromServer.find(user => user.name === name);

  return foundName || null;
}

export const preparedTodosFromServer: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(preparedTodosFromServer);
  const [title, setTitle] = useState('');
  const [username, setUsername] = useState('');
  const [isTitleValid, setIsTitleValid] = useState(false);
  const [isUserValid, setIsUserValid] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const id = Math.max(...todos.map((todo) => todo.id)) + 1;
    const newUser = getUserByName(username);

    const newTodo: Todo = {
      id,
      title,
      completed: false,
      userId: newUser ? newUser.id : null,
      user: newUser,
    };

    setIsTitleValid(Boolean(!title.trim()));
    setIsUserValid(Boolean(!username));

    if (!title.trim() || !username) {
      return;
    }

    setTodos((prevTodos) => [...prevTodos, newTodo]);

    setTitle('');
    setUsername('');
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement
  | HTMLSelectElement>
    = (event) => {
      const { id, value } = event.target;

      switch (id) {
        case 'title':
          setTitle(value.replace(/[^a-zA-Zа-яА-ЯїЇіІєЄёЁ0-9\s]+/g, ''));
          setIsTitleValid(Boolean(!value));
          break;

        case 'user':
          setUsername(value);
          setIsUserValid(Boolean(!value));
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
        onSubmit={handleSubmit}
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

          {isTitleValid
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>

          <select
            data-cy="userSelect"
            id="user"
            value={username}
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

          {isUserValid
            && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
