import './App.scss';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';

export const App = () => {
  function getUserById(userId: number) {
    return usersFromServer.find(user => user.id === userId) || null;
  }

  const todos = todosFromServer.map(todo => ({
    ...todo,
    user: getUserById(todo.userId),
  }));

  const [todoList, setTodoList] = useState(todos);

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const [selectValue, setSelectValue] = useState('0');
  const [hasSelectError, sethasSelectError] = useState(false);
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(event.target.value);
    sethasSelectError(false);
  };

  const addTodo = (newTodo: Todo) => {
    setTodoList(prevTodo => [...prevTodo, newTodo]);
  };

  const reset = () => {
    setTitle('');
    setSelectValue('0');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setHasTitleError(!title);
    sethasSelectError(selectValue === '0');

    if (!title || selectValue === '0') {
      return;
    }

    addTodo({
      id: Math.max(...todoList.map(todo => todo.id)) + 1,
      title,
      completed: false,
      userId: +selectValue,
      user: getUserById(+selectValue),
    });

    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" onSubmit={handleSubmit} method="POST">
        <div className="field">
          <label htmlFor="title">
            Title:&nbsp;
            <input
              type="text"
              placeholder="Enter a title"
              id="title"
              onChange={handleTitleChange}
              value={title}
              data-cy="titleInput"
            />
          </label>
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            User:&nbsp;
            <select
              data-cy="userSelect"
              onChange={handleSelectChange}
              value={selectValue}
            >
              <option value="0" key="0" disabled>
                Choose a user
              </option>
              {usersFromServer.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {hasSelectError && (
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
