import { FormEvent, useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';

import { User } from './types/User';
import { Todo } from './types/Todo';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [prevTodos, setTodos] = useState(todos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleCheck, setTitleCheck] = useState(false);
  const [userIdCheck, setuserIdCheck] = useState(false);

  const createTodo = () => {
    return (
      {
        id: Math.max(0, ...prevTodos.map(({ id }) => id + 1)),
        userId,
        title,
        completed: false,
        user: getUser(userId) || null,
      }
    );
  };

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (title.length < 1) {
      setTitleCheck(true);
    }

    if (userId === 0) {
      setuserIdCheck(true);
    }

    if ((title.length === 0) || (userId === 0)) {
      return;
    }

    setTodos([...prevTodos, createTodo()]);
    setUserId(0);
    setTitle('');
  }

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
            placeholder="Enter a title"
            name="title"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              setTitleCheck(false);
            }}
          />
          {titleCheck && (<span className="error">Please enter a title</span>)}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={(event) => {
              setUserId(+event.target.value);
              setuserIdCheck(false);
            }}
          >
            <option
              value="0"
              disabled
              selected
            >
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          {userIdCheck && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>
      <TodoList todos={prevTodos} />
    </div>
  );
};
