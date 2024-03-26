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

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [isTitleError, setIsTitleError] = useState(false);
  const [isUserError, setIsUserError] = useState(false);

  const handleSubbmit: FormEventHandler = event => {
    event.preventDefault();
    let isValid = true;

    if (!title) {
      setIsTitleError(true);
      isValid = false;
    }

    if (!userId) {
      setIsUserError(true);
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const user = usersFromServer.find(u => userId === u.id) || null;
    const todo = {
      id:
        Math.max(
          ...todos.map(t => {
            return t.id;
          }),
        ) + 1,
      userId,
      title,
      completed: false,
      user,
    };

    todos.push(todo);

    setTitle('');
    setUserId(0);
  };

  const handleTitle: ChangeEventHandler<HTMLInputElement> = e => {
    setIsTitleError(false);
    setTitle(e.target.value);
  };

  const handleUser: ChangeEventHandler<HTMLSelectElement> = e => {
    setIsUserError(false);
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
            onChange={handleTitle}
          />
          {isTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            name="userId"
            value={userId}
            onChange={handleUser}
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

          {isUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
