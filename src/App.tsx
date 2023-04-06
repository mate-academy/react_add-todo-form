import './App.scss';
import React, { useEffect, useState } from 'react';
import { TodoList } from './components/TodoList';
import { User } from './types/User';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';

const getUser = (userId: number): User | null => {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
};

const todos = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasUser, setHasUser] = useState(true);
  const [hasTitle, setHasTitle] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [listTodo, setListTodo] = useState<Todo[]>(todos);

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement | HTMLButtonElement>,
  ) => {
    event.preventDefault();
    setIsFormSubmitted(true);
    const user = getUser(userId);
    const nextId = Math.max(...listTodo.map(todo => todo.id));

    const newTodo: Todo = {
      id: nextId + 1,
      title,
      completed: false,
      userId,
      user: user ?? null,
    };

    if (isFormValid) {
      setListTodo([...listTodo, newTodo]);
      setTitle('');
      setUserName('');
      setIsFormSubmitted(false);
    }
  };

  useEffect(() => {
    setHasTitle(!!title.trim().length);
  }, [title]);

  useEffect(() => {
    setHasUser(!!userName);
  }, [userName]);

  useEffect(() => {
    setIsFormValid(hasTitle && hasUser);
  }, [hasTitle, hasUser]);

  const handleUserChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    if (name === 'userName') {
      setUserName(value);
      setHasUser(true);
      setUserId(+value);
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === 'title') {
      setTitle(value);
      setHasTitle(true);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title: </label>

          <input
            id="titleInput"
            name="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />

          {!isFormValid && isFormSubmitted && !hasTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userInput">User: </label>

          <select
            id="userInput"
            name="userName"
            data-cy="userSelect"
            value={userName}
            onChange={handleUserChange}
          >
            <option value="" disabled>Choose a user</option>
            {usersFromServer.map(({ id, name }: User) => {
              return <option key={id} value={id}>{name}</option>;
            })}
          </select>
          {!isFormValid && isFormSubmitted && !hasUser && (
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

      <TodoList todolist={listTodo} />
    </div>
  );
};
