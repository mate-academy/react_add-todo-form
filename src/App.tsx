import React, { useState } from 'react';

import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types';
import { Todo } from './types';
import { TodoList } from './components/TodoList/';

function getUserById(userId: User['id']) {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [selectError, setSelectError] = useState(false);

  function addTodo(newTodo: Todo) {
    const addedTodo: Todo = {
      ...newTodo,
      id: Math.max(...todos.map(todo => todo.id)) + 1,
    };

    setTodos(currTodo => [...currTodo, addedTodo]);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setTitleError(!title.trim());
    setSelectError(!selectedUserId);

    if (!title.trim() || !selectedUserId) {
      return;
    }

    const newTodo: Todo = {
      id: 0,
      title,
      completed: false,
      userId: selectedUserId,
      user: getUserById(selectedUserId),
    };

    addTodo(newTodo);

    setTitle('');
    setSelectedUserId(0);
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
    setTitleError(false);
  }

  function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedUserId(+e.target.value);
    setSelectError(false);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleInput}
            placeholder="Enter a title"
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            onChange={handleSelect}
            value={selectedUserId}
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

          {selectError && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          disabled={titleError || selectError}
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
