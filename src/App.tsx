import './App.scss';
import React, { FunctionComponent, useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './react-app-env';
import { TodoList } from './components/TodoList';

const getUserById = (userId: number) => {
  const foundedUser = usersFromServer.find(user => user.id === userId);

  return foundedUser || null;
};

const todosWithUser: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.id),
}));

export const App: FunctionComponent = () => {
  const [title, setTitle] = useState('');
  const [authorId, setAuthorId] = useState(0);
  const [todoList, setTodoList] = useState(todosWithUser);
  const [titleError, setTitleError] = useState(false);
  const [authorError, setAuthorError] = useState(false);
  const id = Math.max(...todosFromServer.map(todo => todo.id));
  const getNewTodoId = () => (
    id + 1
  );
  const clearForm = () => {
    setTitle('');
    setAuthorId(0);
    setTitleError(false);
    setAuthorError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setTitleError(() => true);
    }

    if (authorId === 0) {
      setAuthorError(() => true);
    }

    const newTodo: Todo = {
      id: getNewTodoId(),
      title,
      completed: false,
      userId: authorId,
      user: getUserById(authorId),
    };

    if (title && authorId) {
      setTodoList((prevTodoList) => [
        ...prevTodoList,
        newTodo,
      ]);

      clearForm();
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (titleError) {
      setTitleError(false);
    }

    setTitle(event.target.value);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (authorError) {
      setAuthorError(false);
    }

    setAuthorId(+event.target.value);
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
          <label htmlFor="#titleInput">
            Title:
          </label>
          <input
            id="titleInput"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleInput}
          />
          {titleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="#userSelect">
            User:
          </label>
          <select
            id="userSelect"
            data-cy="userSelect"
            value={authorId}
            onChange={handleSelect}
          >
            <option
              value="0"
              disabled
            >
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          {authorError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todoList={todoList} />
    </div>
  );
};
