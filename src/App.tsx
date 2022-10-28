import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoFromServer } from './types/TodoFromServer';
import { TodoList } from './components/TodoList';
import { getTodos } from './utils/getTodos';
import { addTodo } from './utils/addTodo';

const pattern = /[А-ЯёїіA-Z\d\s]/i;

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('0');
  const [todos, setTodos] = useState(getTodos(todosFromServer));
  const [showErrorTitle, setShowErrorTitle] = useState(false);
  const [showErrorUser, setShowErrorUser] = useState(false);

  function handleChange(
    func: React.Dispatch<React.SetStateAction<string>>,
    event: React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLSelectElement>,
  ): void {
    const { value } = event.target;
    const lastIndex = value.length - 1;

    if (value.length && pattern.test(value[lastIndex])) {
      func(value);
    }

    if (!event.target.value) {
      func(value);
    }
  }

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
    currTodos: TodoFromServer[],
  ) {
    event.preventDefault();

    if (!title || !title.trim()) {
      setShowErrorTitle(true);
    }

    if (selectedUserId === '0') {
      setShowErrorUser(true);
    }

    if (!title || selectedUserId === '0' || !title.trim()) {
      return;
    }

    let maxCurrTodoId = 1;

    for (let i = 1; i < currTodos.length; i += 1) {
      maxCurrTodoId = Math.max(currTodos[i].id, currTodos[i - 1].id);
    }

    setTodos(getTodos(
      addTodo(
        Number(selectedUserId),
        maxCurrTodoId + 1,
        title,
        currTodos,
      ),
    ));

    setTitle('');
    setSelectedUserId('0');
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => handleSubmit(
          event,
          todos,
        )}
      >
        <div className="field">
          <label>
            {'Title: '}

            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={(event) => {
                handleChange(setTitle, event);
                setShowErrorTitle(false);
              }}
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
              onChange={(event) => {
                handleChange(setSelectedUserId, event);
                setShowErrorUser(false);
              }}
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

      <TodoList todosFromServer={todos} />
    </div>
  );
};
