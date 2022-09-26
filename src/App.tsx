import './App.scss';

import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';

function getUser(userId: number | null): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

const maxTodosId = [...todos].sort((todo1, todo2) => todo2.id - todo1.id)[0].id;

export const App: React.FC = () => {
  const [userId, setUserId] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [isValidTitle, setIsValidTitle] = useState(true);
  const [isValidUser, setIsValidUser] = useState(true);

  const makeNewTodo = () => {
    const newTodo = {
      id: maxTodosId + 1,
      title,
      completed: false,
      userId,
      user: getUser(userId),
    };

    todos.push(newTodo);
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsValidTitle(true);
  };

  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setIsValidUser(true);
  };

  function reset() {
    setUserId(0);
    setTitle('');
    setIsValidTitle(true);
    setIsValidUser(true);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!userId) {
      setIsValidUser(false);
    }

    if (!title.trim()) {
      setIsValidTitle(false);
    }

    if (!userId || !title.trim()) {
      return;
    }

    makeNewTodo();

    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleChangeInput}
          />
          {isValidTitle || <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleChangeSelect}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(({ name, id }) => (
              <option value={id} key={id}>{name}</option>
            ))}
          </select>

          {isValidUser || <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
