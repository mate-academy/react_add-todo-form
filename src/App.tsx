import './App.scss';

import { ChangeEventHandler, FormEventHandler, useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList/TodoList';

import { Todo } from './types/Todo';

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId) || null,
}));

function getId() {
  let id = 0;

  return () => {
    if (!id) {
      for (let i = 0; i < todos.length; i++) {
        if (todos[i].id > id) {
          id = todos[i].id;
        }
      }
    }

    id++;

    return id;
  };
}

const nextId = getId();

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [isTitleInvalid, setIsTitleInvalid] = useState(false);
  const [isChosenUserInvalid, setIsChosenUserInvalid] = useState(false);

  const handleSubmit: FormEventHandler = e => {
    e.preventDefault();
    let isValid = true;

    if (!title) {
      setIsTitleInvalid(true);
      isValid = false;
    }

    if (!userId) {
      setIsChosenUserInvalid(true);
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const user = usersFromServer.find(u => userId === u.id) || null;
    const todo = {
      id: nextId(),
      userId,
      title,
      completed: false,
      user,
    };

    todos.push(todo);

    setTitle('');
    setUserId(0);
  };

  const handleTitleChange: ChangeEventHandler<HTMLInputElement> = e => {
    setIsTitleInvalid(false);
    setTitle(e.target.value);
  };

  const handleUserChange: ChangeEventHandler<HTMLSelectElement> = e => {
    setIsChosenUserInvalid(false);
    setUserId(+e.target.value);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            name="title"
            value={title}
            placeholder="Add title"
            onChange={handleTitleChange}
          />
          {isTitleInvalid && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            name="userId"
            value={userId}
            onChange={handleUserChange}
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

          {isChosenUserInvalid && (
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
