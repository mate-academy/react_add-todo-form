import React, { useState } from 'react';

import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [count, setCount] = useState(0);
  const [taskOwner, setTaskOwner] = useState(0);
  const [hasTaskOwnerError, setHasTaskOwnerError] = useState(false);

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todosFromServer);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filteredTitle = event.target.value.replace(
      /[^a-zA-Zа-яА-ЯґҐєЄіІїЇ0-9\s]/g,
      '',
    );

    setTitle(filteredTitle);
    setHasTitleError(false);
  };

  function getNewTodoId(todos: Todo[]) {
    return Math.max(...todos.map(todo => todo.id)) + 1;
  }

  const addTodo = (newTodo: Todo) => {
    setVisibleTodos(curTodos => [...curTodos, newTodo]);
  };

  const reset = () => {
    setTitle('');
    setHasTitleError(false);

    setTaskOwner(0);
    setHasTaskOwnerError(false);
    const selectElement = document.getElementById(
      'userSelect',
    ) as HTMLSelectElement;

    selectElement.value = '0';
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    let hasError = false;

    if (title.trim() === '') {
      setHasTitleError(true);
      hasError = true;
    }

    if (taskOwner === 0) {
      setHasTaskOwnerError(true);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    addTodo({
      id: getNewTodoId(visibleTodos),
      completed: false,
      title,
      userId: taskOwner,
    });

    setCount(count + 1);

    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title:&nbsp;</label>

          <input
            type="text"
            data-cy="titleInput"
            id="title"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />

          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User:&nbsp;</label>

          <select
            id="userSelect"
            data-cy="userSelect"
            onChange={event => {
              setTaskOwner(+event.target.value);
              setHasTaskOwnerError(false);
            }}
            defaultValue={0}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasTaskOwnerError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
