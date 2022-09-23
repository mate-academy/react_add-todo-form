import { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList/index';
import { Todo } from './types/Todo';
import { User } from './types/User';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [title, SetTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [validUser, setValidUser] = useState(false);
  const [validTitle, setValidTitle] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (userId === 0) {
      setValidUser(true);
    }

    if (title.length === 0) {
      setValidTitle(true);
    }

    if (userId === 0 || title.length === 0) {
      return;
    }

    const maxId = Math.max(...todos.map((todo) => todo.id + 1));

    const newTodo: Todo = {
      id: maxId,
      title,
      completed: false,
      userId,
      user: getUser(userId),
    };

    todos.push(newTodo);

    setUserId(0);
    SetTitle('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        onSubmit={handleSubmit}
        action="/api/users"
        method="POST"
      >
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              name="title"
              placeholder="Enter a title"
              value={title}
              onChange={event => {
                SetTitle(event.target.value);
                setValidTitle(false);
              }}
            />
          </label>

          {validTitle
          && <span className="error">Please enter a title.</span>}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              name="UserId"
              id="user"
              value={userId}
              onChange={event => {
                setUserId(Number(event.target.value));
                setValidUser(false);
              }}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(({ id, name }) => (
                <option
                  key={id}
                  value={id}
                >
                  {name}
                </option>
              ))}
            </select>
          </label>

          {validUser && (
            <span className="error">Please choose a user.</span>)}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
