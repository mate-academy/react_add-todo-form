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

const initialTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [title, setTitle] = useState('');
  const [isValidTitle, setIsValidTitle] = useState(false);
  const [userId, setUserId] = useState(0);
  const [isValidUser, setIsValidUser] = useState(false);
  const [movieId, setMovieId] = useState(16);

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setIsValidUser(false);
    setUserId(+event.target.value);
  };

  const handleTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setIsValidTitle(false);
    setTitle(event.target.value);
  };

  const createTodo = (event: MouseEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      setIsValidTitle(true);
    }

    if (!userId) {
      setIsValidUser(true);
    }

    if (!title.trim() || !userId) {
      return;
    }

    setMovieId(movieId + 1);

    const newTodo = {
      id: movieId,
      title,
      completed: false,
      userId,
      user: getUser(userId),
    };

    setTitle('');
    setUserId(0);
    setTodos([...todos, newTodo]);
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
              value={title}
              onChange={handleTitle}
              placeholder="Enter a title"
            />
          </label>
          {isValidTitle
            && (<span className="error">Please enter a title</span>)}
        </div>

        <div className="field">
          <label>
            User:&nbsp;
            <select
              data-cy="userSelect"
              onChange={handleSelect}
              value={userId}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option value={user.id} key={`${user.id}`}>{user.name}</option>
              ))}
            </select>
          </label>
          {isValidUser
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
        todos={todos}
      />
    </div>
  );
};
