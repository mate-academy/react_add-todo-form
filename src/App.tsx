import React from 'react';
import './App.scss';
import { getUserById, todos } from './components/todosStaticList';
import { TodoList } from './components/TodoList';
import users from './api/users';
import { useState } from 'react';
import { Todo } from './types';
import { getLargestId } from './services/postId';

const DEFAULT_USER_ID = 0;
const EMPTY_TITLE_ERROR = 'Please enter a title';
const EMPTY_USER_ERROR = 'Please choose a user';

export const App = () => {
  const [currTodos, setCurrTodos] = useState<Todo[]>(todos);
  const [titleValue, setTitleValue] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(DEFAULT_USER_ID);
  const [inputError, setInputError] = useState(false);
  const [selectError, setSelectError] = useState(false);

  const reset = () => {
    setTitleValue('');
    setSelectedUserId(DEFAULT_USER_ID);
    setInputError(false);
    setSelectError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!titleValue) {
      setInputError(true);
    }

    if (!selectedUserId) {
      setSelectError(true);
    }

    if (titleValue && selectedUserId) {
      const newTodo: Todo = {
        id: getLargestId(currTodos),
        title: titleValue,
        completed: false,
        userId: selectedUserId,
        user: getUserById(selectedUserId) || null,
      };

      setCurrTodos(prevTodos => [...prevTodos, newTodo]);

      reset();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleId">Title: </label>
          <input
            id="titleId"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={titleValue}
            onChange={event => setTitleValue(event.target.value)}
          />
          {inputError && !titleValue && (
            <span className="error">{EMPTY_TITLE_ERROR}</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="selectId">User: </label>
          <select
            id="selectId"
            data-cy="userSelect"
            value={selectedUserId}
            onChange={e => setSelectedUserId(+e.target.value)}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {selectError && !selectedUserId && (
            <span className="error">{EMPTY_USER_ERROR}</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={currTodos} />
    </div>
  );
};
