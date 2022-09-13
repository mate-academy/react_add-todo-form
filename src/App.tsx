import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { Todo, User } from './types';
import { TodoList } from './components/TodoList/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

const visibleTodos = [...todos];

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [errorTittle, setErrorTittle] = useState(false);
  const [errorUser, setErrorUser] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (userId === 0 || title === '') {
      setErrorTittle(title === '');
      setErrorUser(userId === 0);

      return;
    }

    const maxId = Math.max(...visibleTodos.map((todo) => todo.id));

    const newTodo = {
      id: maxId + 1,
      title,
      userId,
      completed: false,
      user: getUser(userId),
    };

    visibleTodos.push(newTodo);

    setTitle('');
    setUserId(0);
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setErrorTittle(false);
  };

  const handleUserSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setErrorUser(false);
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
            <span className="inputTitle">Title: </span>

            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleTitle}
            />
          </label>
          {errorTittle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            <span className="inputTitle">User: </span>
            <select
              data-cy="userSelect"
              value={userId}
              onChange={handleUserSelect}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option value={user.id}>{user.name}</option>
              ))}

            </select>
          </label>
          {errorUser && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
