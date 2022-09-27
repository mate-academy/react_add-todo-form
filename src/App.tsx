import './App.scss';
import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';

function getUser(UserId: number) {
  const foundUser = usersFromServer.find(user => user.id === UserId);

  return foundUser || null;
}

const todos: Todo[] = todosFromServer.map((todo) => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [userId, setUserId] = useState(0);
  const [userIdError, setUserIdError] = useState(false);
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setTitleError(false);

    setTitle(value);
  };

  const handleuserid = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setUserIdError(false);

    setUserId(+value);
  };

  const handleSubmitForm = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const maxId = Math.max(0, ...todos.map(({ id }) => id));

    if (title.trim() === '' || userId === 0) {
      setTitleError(title.trim() === '');
      setUserIdError(userId === 0);

      return;
    }

    const newTodo = {
      id: maxId + 1,
      userId,
      title,
      completed: false,
      user: getUser(userId),
    };

    todos.push(newTodo);

    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmitForm}
      >
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleTitle}
            />
          </label>
          {titleError && (<span className="error">Please enter a title</span>)}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={userId}
              onChange={handleuserid}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(({ id, name }) => (
                <option key={id} value={id}>{name}</option>
              ))}
            </select>
          </label>

          {userIdError && (<span className="error">Please choose a user</span>)}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
