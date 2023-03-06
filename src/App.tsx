import './App.scss';
import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './props/User';
import { TodoList } from './components/TodoList';
import { Todo } from './props/Todo';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [userId, setUsersId] = useState(0);
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [todosList, setTodosList] = useState(todos);

  const handleTitleChange = (value: string) => {
    setTitle(value);

    setTitleError(false);
  };

  const handleUserChange = (value: number) => {
    setUsersId(value);

    setUserError(false);
  };

  const showErrors = () => {
    if (!title.trim() && !userId) {
      setTitleError(true);
      setUserError(true);
    }
  };

  const addTodoList = (id: number) => {
    const passForm = () => {
      setTitleError(false);
      setUserError(false);
      setTitle('');
      setUsersId(0);
    };

    if (userId && title.trim()) {
      const newId = Math.max(...todosList.map((todo) => todo.id)) + 1;

      const toCreate = {
        id: newId,
        title,
        completed: false,
        userId,
        user: getUser(id),
      };

      passForm();

      setTodosList((prev) => [...prev, toCreate]);
    }

    showErrors();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTodoList(userId);
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
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            value={title}
            data-cy="titleInput"
            placeholder="Please enter a title"
            onChange={(e) => handleTitleChange(e.target.value)}
          />
          {
            titleError && <span className="error">Please enter a title</span>
          }
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            id="user"
            data-cy="userSelect"
            value={userId}
            onChange={(e) => handleUserChange(+e.target.value)}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(({ name, id }) => (
              <option value={id} key={id}>{name}</option>
            ))}
          </select>
          {
            userError && <span className="error">Please choose a user</span>
          }
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>
      <TodoList todos={todosList} />
    </div>
  );
};
