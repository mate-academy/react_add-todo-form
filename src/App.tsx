import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [myTodos, setTodos] = useState<Todo[]>(todos);
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [hasErrorTitle, setHasErrorTitle] = useState(false);
  const [hasErrorSelect, setHasErrorSelect] = useState(false);
  const nextId =
    myTodos.length > 0 ? Math.max(...myTodos.map(todo => todo.id)) + 1 : 1;

  function addTodos(todo: Todo) {
    setTodos(currentTodos => [...currentTodos, todo]);
  }

  function handleTitleChange(value: string) {
    setTitle(value);
    setHasErrorTitle(false);
  }

  function handleSelectChange(value: number) {
    setSelectedUserId(value);
    setHasErrorSelect(false);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const isTitleEmpty = title.trim() === '';
    const isUserNotSelected = selectedUserId === 0;

    setHasErrorTitle(isTitleEmpty);
    setHasErrorSelect(isUserNotSelected);

    if (isTitleEmpty || isUserNotSelected) {
      return;
    }

    const newTodo: Todo = {
      id: nextId,
      title: title,
      completed: false,
      userId: selectedUserId,
      user: getUserById(selectedUserId),
    };

    addTodos(newTodo);
    setTitle('');
    setSelectedUserId(0);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleId">Title: </label>
          <input
            id="titleId"
            placeholder="Enter a title"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={e => handleTitleChange(e.target.value)}
          />
          {hasErrorTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelectId">User: </label>
          <select
            id="userSelectId"
            data-cy="userSelect"
            value={selectedUserId}
            onChange={e => handleSelectChange(+e.target.value)}
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

          {hasErrorSelect && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={myTodos} />
    </div>
  );
};
