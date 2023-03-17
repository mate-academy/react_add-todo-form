import './App.scss';

import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [todoList, setTodo] = useState(todosFromServer);
  const [todoState, setData] = useState({
    title: '',
    select: '0',
  });
  const [titleError, setTitileError] = useState(false);
  const [selectError, setSelectError] = useState(false);

  const handleChange = (event:
  React.ChangeEvent<HTMLSelectElement> |
  React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;

    if (name === 'title' && value) {
      setTitileError(false);
    }

    if (name === 'select' && value !== '0') {
      setSelectError(false);
    }

    setData({
      ...todoState,
      [name]: value,
    });
  };

  const addTodo = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (!todoState.title) {
      setTitileError(true);
    }

    if (todoState.select === '0') {
      setSelectError(true);
    }

    const currentUser = usersFromServer
      .find(user => user.name === todoState.select);

    const currentUserId = currentUser !== undefined
      ? currentUser.id
      : null;

    if (!currentUserId || !todoState.title) {
      return;
    }

    const maxId = todoList
      .reduce((max, item) => (item.id > max ? item.id : max), 0);

    const todo = {
      id: maxId + 1,
      title: todoState.title.trim(),
      completed: false,
      userId: currentUserId,
    };

    setTodo([...todoList, todo]);

    setData({
      title: '',
      select: '0',
    });
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={addTodo}
      >
        <div className="field">
          <label>
            Title:
            {' '}
            <input
              name="title"
              value={todoState.title}
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              onChange={(event) => {
                handleChange(event);
              }}
            />
          </label>

          {titleError
          && (<span className="error">Please enter a title</span>)}
        </div>

        <div className="field">
          <label>
            User:
            {' '}
            <select
              data-cy="userSelect"
              value={todoState.select}
              name="select"
              onChange={(event) => {
                handleChange(event);
              }}
            >
              <option
                value="0"
                disabled
              >
                Choose a user
              </option>

              {[...usersFromServer].map(user => (
                <option
                  id={`${user.id}`}
                  value={user.name}
                  data-username={user.username}
                  data-email={user.email}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {selectError
          && (<span className="error">Please choose a user</span>)}

        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todoList} userList={usersFromServer} />
    </div>
  );
};
