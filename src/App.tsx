import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

const getUser = (userId: number): User | null => {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
};

export const visibleTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [textTitle, addTitle] = useState('');
  const [userId, changeUser] = useState(0);
  const [titleError, showTitleError] = useState(false);
  const [userError, showUserError] = useState(false);
  const maxId = Math.max(...visibleTodos.map(todo => todo.id));

  const titleHendler = (e:React.ChangeEvent<HTMLInputElement>) => {
    addTitle(e.target.value.replace(/[^a-zа-я0-9\s]/ig, ''));
    showTitleError(false);
  };

  const userHendler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    changeUser(+e.target.value);
    showUserError(false);
  };

  const addTodo = () => {
    visibleTodos.push({
      id: maxId + 1,
      title: textTitle,
      completed: false,
      userId,
      user: getUser(userId),
    });
  };

  const submitHendler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userId && textTitle) {
      addTodo();
      changeUser(0);
      addTitle('');

      return;
    }

    showTitleError(!textTitle);
    showUserError(!userId);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={submitHendler}
      >
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={textTitle}
              onChange={titleHendler}
            />
          </label>

          {titleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={userId}
              onChange={userHendler}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(({ id, name }) => (
                <option
                  key={id}
                  value={id}
                >
                  {name}
                </option>
              ))}
            </select>
          </label>

          {userError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList visibleTodos={visibleTodos} />
    </div>
  );
};
