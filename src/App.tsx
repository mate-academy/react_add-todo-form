import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/';
import { TodoList } from './components/TodoList';

const getTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId),
}));

export const App = () => {
  const [todos, setTodo] = useState<Todo[]>(getTodos);
  const [title, setTitle] = useState<string>('');
  const [selectUserId, setSelectUserId] = useState<number>(0);
  const [titleError, setTitleError] = useState<boolean>(false);
  const [userIdError, setUserIdError] = useState<boolean>(false);

  const addTodo = (newTodo: Todo): void => {
    setTodo(prevTodo => [...prevTodo, newTodo]);
  };

  const onReset = () => {
    setTitle('');
    setSelectUserId(0);
    setTitleError(false);
    setUserIdError(false);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleUserId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectUserId(+event.target.value);
    setUserIdError(false);
  };

  const maxId = (todoItem: Todo[]) => {
    const newMaxId = Math.max(...todoItem.map(todo => todo.id));

    return newMaxId + 1;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      setTitleError(true);
    }

    if (!selectUserId) {
      setUserIdError(true);
    }

    if (!title || !selectUserId) {
      return;
    }

    const newTodo: Todo = {
      id: maxId(todos),
      title,
      userId: selectUserId,
      user: usersFromServer.find(user => user.id === selectUserId),
      completed: false,
    };

    addTodo(newTodo);
    onReset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            data-cy="titleInput"
            placeholder="Enter title"
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>
        <div className="field">
          <label htmlFor="user">User</label>
          <select
            id="user"
            value={selectUserId}
            onChange={handleUserId}
            data-cy="userSelect"
            required
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
          {userIdError && <span className="error">Please choose a user</span>}
        </div>
        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
