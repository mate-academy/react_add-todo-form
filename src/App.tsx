import React, { useState, useMemo } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { getTodos } from './utils/getTodos';
import { addTodo } from './utils/addTodo';
import { findMaxId } from './utils/findMaxId';

const pattern = /[А-ЯёїіA-Z\d\s]/i;

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [todos, setTodos] = useState(todosFromServer);
  const [showErrorTitle, setShowErrorTitle] = useState(false);
  const [showErrorUser, setShowErrorUser] = useState(false);

  const todosForRender = useMemo(() => {
    return getTodos(todos);
  }, [todos]);

  function handleTitle(event: React.ChangeEvent<HTMLInputElement>): void {
    const { value } = event.target;
    const lastIndex = value.length - 1;

    if (!value || pattern.test(value[lastIndex])) {
      setTitle(value);
    }

    setShowErrorTitle(false);
  }

  function handleUserId(event: React.ChangeEvent<HTMLSelectElement>): void {
    const { value } = event.target;

    setSelectedUserId(Number(value));
    setShowErrorUser(false);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title || !title.trim()) {
      setShowErrorTitle(true);
    }

    if (!selectedUserId) {
      setShowErrorUser(true);
    }

    if (!title || !selectedUserId || !title.trim()) {
      return;
    }

    const maxTodoId = findMaxId(todos);
    const newTodo = {
      selectedUserId,
      newTodoId: maxTodoId + 1,
      title,
      todos,
    };

    setTodos(addTodo(newTodo));
    setTitle('');
    setSelectedUserId(0);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label>
            {'Title: '}

            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleTitle}
            />
          </label>
          {showErrorTitle
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            {'User: '}

            <select
              data-cy="userSelect"
              onChange={handleUserId}
              value={selectedUserId}
            >
              <option
                value="0"
                disabled
              >
                Choose a user
              </option>

              {usersFromServer.map((user) => (
                <option
                  value={user.id}
                  key={user.id}
                >
                  { user.name }
                </option>
              ))}
            </select>
          </label>

          {showErrorUser
            && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todosFromServer={todosForRender} />
    </div>
  );
};
