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
  const [userSelected, setUserSelected] = useState(false);
  const [titleSelected, setTitleSeleected] = useState(false);

  const maxTodoId = Math.max(
    ...updatedTodos.map(updatedTodo => updatedTodo.id),
  );

  function spellingChecker(text:string) {
    const result = text.match(/[a-zA-Zа-яА-Я\d\s]/g);

    return result ? result.join('') : '';
  }

  function submitHandler() {
    setUserSelected(!user);
    setTitleSeleected(!title.trim());

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

    setUpdatedTodos(currentToDo => ([
      ...currentToDo,
      newTodo,
    ]));

    setTitle('');
    setUser('');
  }

  function changeHandler(e: ChangeEvent) {
    const target = e.target as HTMLInputElement;

    switch (target.id) {
      case 'select':
        setUser(target.value);
        setUserSelected(false);
        break;
      case 'title':
        setTitle(spellingChecker(target.value));
        setTitleSeleected(false);
        break;
      default:
        break;
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
            className="field__label"
          >
            Title:
          </label>
          <input
            type="text"
            id="title"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={changeHandler}
          />
          {titleSelected && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label
            htmlFor="select"
            className="field__label"
          >
            User:
          </label>
          <select
            data-cy="userSelect"
            id="select"
            value={user}
            onChange={changeHandler}
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

          {userSelected && (
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
