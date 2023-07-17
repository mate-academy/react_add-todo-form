import './App.scss';

import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './components/types/Todo';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId)
      || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todosList, setTodosList] = useState<Todo[]>(todos);
  const [title, setTitle] = useState('');
  const [userSelection, setUserSelection] = useState('0');
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  function onAdd(event: React.FormEvent) {
    event.preventDefault();
    if ((!title || title.trim() === '') && userSelection === '0') {
      setTitleError(true);
      setUserError(true);

      return;
    }

    if (userSelection === '0') {
      setUserError(true);

      return;
    }

    if (!title) {
      setTitleError(true);

      return;
    }

    const newTodo: Todo = {
      id: Math.max(...todos.map(todo => todo.id)) + 1,
      title,
      completed: false,
      userId: +userSelection,
      user: getUserById(+userSelection),
    };

    setTodosList(newTodos => [...newTodos, newTodo]);
    setTitle('');
    setUserSelection('0');
    setTitleError(false);
    setUserError(false);
  }

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
    setTitleError(false);
  }

  function handleUserChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setUserSelection(event.target.value);
    setUserError(false);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={onAdd}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />

          {titleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelection">User: </label>
          <select
            id="userSelection"
            data-cy="userSelect"
            value={userSelection}
            onChange={handleUserChange}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>

          {userError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todosList} />
    </div>
  );
};
