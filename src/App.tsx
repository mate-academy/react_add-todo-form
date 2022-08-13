import React, { useState } from 'react';

import './App.scss';

import { TodoList } from './components/TodoList/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { Todo } from './Types/Todo';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');

  const [isTitleError, setIsTitleError] = useState(false);
  const [isUserError, setIsUserError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);

    setIsTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(event.target.value);

    setIsUserError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const getUsersMaxId = (TodoItems: Todo[]) => {
    return Math.max(...TodoItems.map((todoItem) => todoItem.id));
  };

  const getNewTodo = (currentTodoList: Todo[]) => ({
    id: getUsersMaxId(currentTodoList) + 1,
    title,
    completed: false,
    userId: +userId,
  });

  const setNewTodo = () => {
    setTodos((currentTodos) => [...currentTodos, getNewTodo(currentTodos)]);

    setTitle('');
    setUserId('');
  };

  const addTodo = () => {
    if (userId && title) {
      setNewTodo();
    }

    if (!userId) {
      setIsUserError(true);
    }

    if (!title) {
      setIsTitleError(true);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" onSubmit={handleSubmit} method="POST">
        <div className="field">
          <input
            onChange={handleTitleChange}
            value={title}
            type="text"
            data-cy="titleInput"
            placeholder="Please, enter a title"
          />
          {isTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            onChange={handleUserChange}
            value={userId}
            data-cy="userSelect"
          >
            <option value="">Choose a user</option>
            {usersFromServer.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
          {isUserError && <span className="error">Please choose a user</span>}
        </div>

        <button onClick={addTodo} type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
