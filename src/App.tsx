import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './components/types/Todo';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [errors, setErrors] = useState({
    isTitleValid: true,
    isUserSelected: true,
  });

  const addTodo = (todo: Todo) => {
    setTodos(curr => [...curr, todo]);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const allowedCharactersRegex = /[^a-zA-Zа-яА-ЯёЁїЇіІєЄґҐ0-9 ]/g;
    const newTitle = event.target.value.replace(allowedCharactersRegex, '');

    setTitle(newTitle);
    setErrors(prev => ({ ...prev, isTitleValid: true }));
  };

  const handleUserSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setErrors(prev => ({ ...prev, isUserSelected: true }));
  };

  const handleErrors = () => {
    const hasErrors = {
      isTitleValid: !!title.trim(),
      isUserSelected: userId !== 0,
    };

    setErrors(hasErrors);

    return Object.values(hasErrors).every(Boolean);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!handleErrors()) {
      return;
    }

    const maxTodoId =
      todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) : 0;

    const newTodo: Todo = {
      id: maxTodoId + 1,
      title,
      completed: false,
      userId,
    };

    addTodo(newTodo);

    setTitle('');
    setUserId(0);
  };

  const userOptions = usersFromServer.map(user => (
    <option value={user.id} key={user.id}>
      {user.name}
    </option>
  ));

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="todoTitle">Title: </label>
          <input
            type="text"
            id="todoTitle"
            data-cy="titleInput"
            value={title}
            placeholder="Enter a title"
            onChange={handleTitleChange}
            onBlur={() => {
              if (!title.trim()) {
                setErrors(prev => ({ ...prev, isTitleValid: false }));
              }
            }}
          />
          {!errors.isTitleValid && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="todoUser">User: </label>
          <select
            id="todoUser"
            data-cy="userSelect"
            value={userId}
            onChange={handleUserSelect}
            onBlur={() => {
              if (userId === 0) {
                setErrors(prev => ({ ...prev, isUserSelected: false }));
              }
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {userOptions}
          </select>
          {!errors.isUserSelected && (
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
