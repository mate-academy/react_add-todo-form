import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const App = () => {
  const [userID, setValue] = useState(0);
  const [titles, setTitles] = useState('');
  const [savedTodos, setTodos] = useState(todosFromServer);
  const [errorTitle, setNoTitle] = useState(false);
  const [errorValue, setNoValue] = useState(false);

  const todos: Todo[] = savedTodos.map(todo => ({
    ...todo,
    user: getUser(todo.userId),
  }));

  const lastesID = savedTodos.map(todo => todo.id);
  const newId = Math.max(...lastesID) + 1;

  const newTodo = {
    id: newId,
    title: titles,
    completed: false,
    userId: userID,
  };

  const newTodos = [
    ...todos,
    newTodo,
  ];

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={event => {
          event.preventDefault();
          if (userID === 0) {
            setNoValue(true);
          }

          if (titles === '') {
            setNoTitle(true);
          }

          if (userID > 0 && titles !== '') {
            setTodos(newTodos);
            setValue(0);
            setTitles('');
          }
        }}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={titles}
            onChange={(event) => {
              setTitles((event.target.value).replace(/[^\w\d\sА-ЯЇЄ]/gi, ''));
              setNoTitle(false);
            }}
          />
          {errorTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            id="user"
            value={userID}
            data-cy="userSelect"
            onChange={(event) => {
              setValue(+event.target.value);
              setNoValue(false);
            }}
          >
            <option value={0} disabled>
              Choose a user
            </option>
            {usersFromServer.map((user) => (
              <option value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {errorValue && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
