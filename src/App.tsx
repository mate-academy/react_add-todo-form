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
  const [isChecked, setChecked] = useState(false);

  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setTitleError(false);
    setTitle(value);
  };

  const changeUserId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setUserIdError(false);
    setUserId(Number(value));
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => {
          event.preventDefault();

          const lastId = Math.max(0, ...todos.map(({ id }) => id));

          const newTodo: Todo = {
            id: lastId + 1,
            userId,
            title,
            completed: isChecked,
            user: getUser(userId),
          };

          if (userId !== 0 && title !== '') {
            todos.push(newTodo);
          } else if (userId === 0 || title === '') {
            setTitleError(title === '');
            setUserIdError(userId === 0);

            return;
          }

          setTitle('');
          setUserId(0);
          setChecked(false);
        }}
      >
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={changeTitle}
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
              onChange={changeUserId}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(({ id, name }) => (
                <option key={id} value={id}>{name}</option>
              ))}
            </select>
          </label>

          <div className="field">
            <label>
              {'Is your todo completed? '}

              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => {
                  setChecked(!isChecked);
                }}
              />
            </label>
          </div>

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
