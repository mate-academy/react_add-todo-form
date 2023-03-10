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

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const users = [...usersFromServer];

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState<null | number>(null);
  const [myTodos, setMyTodos] = useState(todos);
  const [isWrongUser, setIsWrongUser] = useState(false);
  const [isEmptyTitle, setIsEmptyTitle] = useState(false);

  const addTodo = () => {
    const arr = myTodos.sort(
      (todo1, todo2) => todo1.id - todo2.id,
    );

    const largestId = arr[arr.length - 1].id;

    if (userId) {
      setMyTodos(state => (
        [...state, {
          id: largestId + 1,
          title,
          completed: false,
          userId,
          user: getUser(userId),
        }]
      ));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title !== '' && userId === null) {
      setIsWrongUser(true);
    } else if (!isEmptyTitle && userId !== null && title.trim() !== '') {
      addTodo();
      setTitle('');
      setUserId(null);
    } else if (title === '' || userId === null) {
      setIsEmptyTitle(true);
      setIsWrongUser(true);
    } else if (title.trim() === '') {
      setIsEmptyTitle(true);
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
            placeholder="Please enter a title"
            value={isEmptyTitle ? '' : title}
            onChange={(event) => {
              setTitle(event.target.value);
              setIsEmptyTitle(false);
            }}
          />

          {isEmptyTitle
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="select">User: </label>
          <select
            data-cy="userSelect"
            id="select"
            value={userId !== null ? userId : 0}
            onChange={event => {
              setUserId(Number(event.target.value));
              setIsWrongUser(false);
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

          {isWrongUser
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
