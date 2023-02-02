import { ChangeEvent, useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number) {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [user, setUser] = useState('');
  const [updatedTodos, setUpdatedTodos] = useState(todos);
  const [noUser, setNoUser] = useState(false);
  const [noTitle, setNoTitle] = useState(false);

  const maxTodoId = Math.max(
    ...updatedTodos.map(updatedTodo => updatedTodo.id),
  );

  function spellingChecker(text:string) {
    const result = text.match(/[a-zA-Zа-яА-Я\d\s]/g);

    return result ? result.join('') : '';
  }

  function submitHandler() {
    if (!user) {
      setNoUser(true);
    }

    if (!title.trim()) {
      setNoTitle(true);
    }

    if (!user || !title.trim()) {
      return;
    }

    const newTodo = {
      id: maxTodoId + 1,
      title,
      completed: false,
      userId: +user,
      user: getUser(+user),
    };

    setUpdatedTodos(currentToDo => (
      [
        ...currentToDo,
        newTodo,
      ]
    ));

    setTitle('');
    setUser('');
  }

  function changeHandler(e: ChangeEvent) {
    const target = e.target as HTMLInputElement;

    if (target.id === 'select') {
      setUser(target.value);
      setNoUser(false);
    }

    if (target.id === 'title') {
      setTitle(spellingChecker(target.value));
      setNoTitle(false);
    }
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={e => e.preventDefault()}
      >
        <div className="field">
          <label
            htmlFor="title"
            style={{ marginRight: 5 }}
          >
            Title:
          </label>
          <input
            type="text"
            id="title"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={e => changeHandler(e)}
          />
          {noTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label
            htmlFor="select"
            style={{ marginRight: 5 }}
          >
            User:
          </label>
          <select
            data-cy="userSelect"
            id="select"
            value={user}
            onChange={e => changeHandler(e)}
          >
            <option
              value=""
              disabled
            >
              Choose a user
            </option>
            {usersFromServer.map(userFromServer => (
              <option
                key={userFromServer.id}
                value={userFromServer.id}
              >
                {userFromServer.name}
              </option>
            ))}
          </select>

          {noUser && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={submitHandler}
        >
          Add
        </button>
      </form>
      <TodoList todos={updatedTodos} />
    </div>
  );
};
