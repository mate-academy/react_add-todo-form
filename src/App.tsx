import { ChangeEvent, MouseEvent, useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const todos = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [initTodos, setTodos] = useState(todos);
  const [title, setTitle] = useState('');
  const [emptyTitle, setEmptyTitle] = useState(false);
  const [userId, setUserId] = useState(0);
  const [emptyUser, setEmptyUser] = useState(false);

  let count = 15;

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setEmptyUser(false);
    setUserId(+event.target.value);
  };

  const handleTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setEmptyTitle(false);
    setTitle(event.target.value);
  };

  const createTodo = (event: MouseEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      setEmptyTitle(true);
    }

    if (!userId) {
      setEmptyUser(true);
    }

    if (!title.trim() || userId === 0) {
      return false;
    }

    count += 1;

    const newTodo = {
      id: count,
      title,
      completed: false,
      userId,
      user: getUser(userId),
    };

    const form = document.querySelector('form');

    if (!form) {
      return false;
    }

    form.reset();

    return setTodos([...initTodos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST">
        <div className="field">
          <label>
            Title:&nbsp;
            <input
              type="text"
              data-cy="titleInput"
              onChange={handleTitle}
              placeholder="Enter a title"
            />
          </label>
          {emptyTitle
            && (<span className="error">Please enter a title</span>)}
        </div>

        <div className="field">
          <label>
            User:&nbsp;
            <select
              data-cy="userSelect"
              onChange={handleSelect}
              defaultValue="0"
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option value={`${user.id}`} key={`${user.id}`}>{user.name}</option>
              ))}
            </select>
          </label>
          {emptyUser
            && (<span className="error">Please choose a user</span>)}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={createTodo}
        >
          Add
        </button>
      </form>

      <TodoList
        todos={initTodos}
      />
    </div>
  );
};
