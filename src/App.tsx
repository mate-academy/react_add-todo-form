import './App.scss';
import { ChangeEvent, FormEvent, useState } from 'react';
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
  const [userID, setUserId] = useState(0);
  const [titles, setTitles] = useState('');
  const [savedTodos, setsSavedTodos] = useState(todosFromServer);
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorValue, setErrorValue] = useState(false);

  const todos: Todo[] = savedTodos.map(todo => ({
    ...todo,
    user: getUser(todo.userId),
  }));

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const todoIDs = savedTodos.map(todo => todo.id);
    const newId = Math.max(...todoIDs) + 1;

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

    if (userID === 0) {
      setErrorValue(true);
    }

    if (titles === '') {
      setErrorTitle(true);
    }

    if (userID > 0 && titles !== '') {
      setsSavedTodos(newTodos);
      setUserId(0);
      setTitles('');
    }
  };

  const handleChangeUser = (event: ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setErrorValue(false);
  };

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitles((event.target.value).replace(/[^\w\d\sА-ЯЇЄ]/gi, ''));
    setErrorTitle(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="./api/users.ts"
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
            value={titles}
            onChange={handleChangeTitle}
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
            onChange={handleChangeUser}
          >
            <option value={0} disabled>
              Choose a user
            </option>
            {usersFromServer.map((user) => (
              <option value={user.id} key={user.id}>
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
