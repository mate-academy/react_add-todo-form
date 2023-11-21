import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { ITodo } from './types/todo';
import { findCurrentUser } from './helpers/findCurrentUser';

const initialTodosList: ITodo[] = [...todosFromServer].map(todo => (
  {
    ...todo,
    user: findCurrentUser(todo.userId),
  }
));

export const App = () => {
  const [todosList, setTodosList] = useState(initialTodosList);
  const [title, setTitle] = useState('');
  const [currentUserId, setCurrentUserId] = useState(0);
  const [hasTitle, setHasTitle] = useState(false);
  const [hasUser, setHasUser] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let hasError = false;

    if (!title || !title.trim()) {
      setHasTitle(true);
      hasError = true;
    }

    if (!currentUserId) {
      setHasUser(true);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    setTitle('');
    setCurrentUserId(0);
    setHasTitle(false);
    setHasUser(false);

    const todoIds = todosList.map(todo => todo.id);
    const newTodoId = Math.max(...todoIds) + 1;

    setTodosList((prevList) => [
      ...prevList,
      {
        id: newTodoId,
        title,
        completed: false,
        userId: currentUserId,
        user: findCurrentUser(currentUserId),
      }]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="titleInput">
            Title:&nbsp;

            <input
              id="titleInput"
              type="text"
              data-cy="titleInput"
              value={title}
              placeholder="Enter a title"
              onChange={(e) => {
                setTitle(e.target.value);
                setHasTitle(false);
              }}
            />
          </label>

          {hasTitle
          && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">
            User:&nbsp;

            <select
              id="userSelect"
              data-cy="userSelect"
              value={currentUserId}
              onChange={e => {
                setCurrentUserId(+e.target.value);
                setHasUser(false);
              }}
            >
              <option value="0" disabled>Choose a user</option>
              {
                [...usersFromServer].map(user => (
                  <option
                    value={user.id}
                    key={user.id}
                  >
                    {user.name}
                  </option>
                ))
              }
            </select>
          </label>

          {hasUser
          && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todosList} />
    </div>
  );
};
