import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { Todo } from './types/Todo';

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId) || null,
}));

function createGetNextId() {
  let maxId = 0;

  return () => {
    if (!maxId) {
      maxId = todos.reduce((acc, curr) => Math.max(acc, curr.id), maxId);
    }

    maxId++;

    return maxId;
  };
}

const getNextId = createGetNextId();

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [isTitleError, setIsTitleError] = useState(false);
  const [isChooseUserError, setisChooseUserError] = useState(false);

  const handleSubbmit: FormEventHandler = event => {
    event.preventDefault();
    let isValid = true;

    if (!title) {
      setIsTitleError(true);
      isValid = false;
    }

    if (!userId) {
      setisChooseUserError(true);
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const user = usersFromServer.find(u => userId === u.id) || null;
    const todo = {
      id: getNextId(),
      userId,
      title,
      completed: false,
      user,
    };

    todos.push(todo);

    setTitle('');
    setUserId(0);
  };

  const handleTitleOnChange: ChangeEventHandler<HTMLInputElement> = e => {
    setIsTitleError(false);
    setTitle(e.target.value);
  };

  const handleUserOnChange: ChangeEventHandler<HTMLSelectElement> = e => {
    setisChooseUserError(false);
    setUserId(+e.target.value);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubbmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            name="title"
            value={title}
            placeholder="Comment Title"
            onChange={handleTitleOnChange}
          />
          {isTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            name="userId"
            value={userId}
            onChange={handleUserOnChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {isChooseUserError && (
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
