import './App.scss';
import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './components/Types/Todo';

const getUserById = (userId: number) => {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
};

const todosWithUser: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.id),
}));

export const getTodoId = (todos: Todo[]) => {
  const id = Math.max(...todos.map(todo => todo.id));

  return id + 1;
};

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [todoUserId, setTodoUserId] = useState(0);
  const [todoList, setTodoList] = useState(todosWithUser);
  const [titleError, setTitleError] = useState(false);
  const [hasUserIdError, setUserIdError] = useState(false);

  const clearForm = () => {
    setTitle('');
    setTodoUserId(0);
    setTitleError(false);
    setUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimTitle = title.trim();

    if (!trimTitle) {
      setTitleError(() => true);
    }

    if (todoUserId === 0) {
      setUserIdError(() => true);
    }

    const newTodo: Todo = {
      id: getTodoId(todoList),
      title,
      completed: false,
      userId: todoUserId,
      user: getUserById(todoUserId),
    };

    if (title && todoUserId) {
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
    if (hasUserIdError) {
      setUserIdError(false);
    }

    setTodoUserId(+event.target.value);
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
            value={todoUserId}
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
          {hasUserIdError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todoList} />
    </div>
  );
};
