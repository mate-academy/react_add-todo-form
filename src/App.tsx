import './App.scss';

import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  // if there is no user with a given userId
  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const users = [...usersFromServer];

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [myTodos, setMyTodos] = useState(todos);
  const [wrongUser, setWrongUser] = useState(false);

  const addTodo = () => {
    const arr = myTodos.sort(
      (todo1, todo2) => todo1.id - todo2.id,
    );

    const largestId = arr[arr.length - 1].id;

    setMyTodos(state => (
      [...state, {
        id: largestId + 1,
        title,
        completed: false,
        userId,
        user: getUser(userId),
      }]
    ));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title !== '' && userId === 0) {
      setWrongUser(true);
      setTitle(title);
    } else if (title !== 'undefined' && userId !== 0 && title.trim() !== '') {
      addTodo();
      setTitle('');
      setUserId(0);
    } else if (title === '' || userId === 0) {
      setTitle('undefined');
      setWrongUser(true);
    } else if (title.trim() === '') {
      setTitle('undefined');
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
            id="title"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title === 'undefined' ? '' : title}
            onChange={event => setTitle(event.target.value)}
          />
          {(title === 'undefined')
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="select">User: </label>
          <select
            data-cy="userSelect"
            id="select"
            value={userId}
            onChange={event => {
              setUserId(Number(event.target.value));
              setWrongUser(false);
            }}
          >
            <option
              value="0"
              disabled
            >
              Choose a user
            </option>
            {users.map(({ id, name }) => {
              return (
                <option
                  key={id}
                  value={id}
                >
                  {name}
                </option>
              );
            })}

          </select>
          {wrongUser
            && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={myTodos} />
    </div>
  );
};
