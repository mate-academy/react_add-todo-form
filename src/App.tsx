import React from 'react';
import './App.scss';
import { getUserById, todos } from './components/todosStaticList';
import { TodoList } from './components/TodoList';
import users from './api/users';
import { useState } from 'react';
import { Todo } from './types';

export const App = () => {
  const [currTodos, setCurrTodos] = useState<Todo[]>(todos);
  const [titleValue, setTitleValue] = useState('');
  const [selectUser, setSelectUser] = useState(0);
  const [inputError, setInputError] = useState(false);
  const [selectError, setSelectError] = useState(false);

  const reset = () => {
    setTitleValue('');
    setSelectUser(0);
    setInputError(false);
    setSelectError(false);
  };

  const getlargestId = () => {
    const newTodos: Todo[] = [...currTodos];

    newTodos.sort((todo1, todo2) => todo1.id - todo2.id);

    return newTodos[newTodos.length - 1].id + 1;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!titleValue) {
      setInputError(true);
    }

    if (!selectUser) {
      setSelectError(true);
    }

    if (titleValue && selectUser) {
      const newTodo: Todo = {
        id: getlargestId(),
        title: titleValue,
        completed: false,
        userId: selectUser,
        user: getUserById(selectUser) || null,
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
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="selectId">User: </label>
          <select
            id="selectId"
            data-cy="userSelect"
            value={selectUser}
            onChange={e => setSelectUser(+e.target.value)}
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

          {selectError && !selectUser && (
            <span className="error">Please choose a user</span>
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
