import './App.scss';
import { FormEvent, useState } from 'react';
import { TodoList } from './components/TodoList';
import { User } from './Types/user';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './Types/todo';

function getUserById(userId: number): User | null {
  const foundUser = usersFromServer.find((user) => userId === user.id);

  return foundUser || null;
}

function getUserByName(userName: string): User | null {
  const foundUser = usersFromServer.find((user) => userName === user.name);

  return foundUser || null;
}

function getUserId(userName: string): number {
  const foundId = usersFromServer.find((user) => userName === user.name);

  if (foundId === undefined) {
    return usersFromServer.length + 1;
  }

  return foundId.id;
}

function getMaxId(todosArr: Todo[]): number {
  const maxId = todosArr.sort((a, b) => b.id - a.id);

  return maxId[0].id;
}

export const todos = todosFromServer.map((todo) => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [user, setUser] = useState('');
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorUser, setErrorUser] = useState(false);

  const addTodo = (event: FormEvent) => {
    event.preventDefault();
    const titleError = title.length === 0;
    const userError = user.length === 0;

    if (titleError && userError) {
      setErrorTitle(true);
      setErrorUser(true);

      return;
    }

    if (titleError) {
      setErrorTitle(true);

      return;
    }

    if (userError) {
      setErrorUser(true);

      return;
    }

    todos.push({
      id: getMaxId(todos) + 1,
      title,
      completed: false,
      userId: getUserId(user),
      user: getUserByName(user),
    });

    setTitle('');
    setUser('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={addTodo}
      >
        <div className="field">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            placeholder="Enter a title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              setErrorTitle(false);
            }}
            data-cy="titleInput"
          />
          {errorTitle
            ? <span className="error">Please enter a title</span>
            : ''}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User:</label>
          <select
            id="userSelect"
            value={user}
            onChange={event => {
              setUser(event.target.value);
              setErrorUser(false);
            }}
            data-cy="userSelect"
          >
            <option
              value="0"
              selected
            >
              Choose a user
            </option>
            {usersFromServer.map(person => {
              return (
                <option value={person.name}>
                  {person.name}
                </option>
              );
            })}
          </select>

          {errorUser
            ? <span className="error">Please choose a user</span>
            : ''}
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
