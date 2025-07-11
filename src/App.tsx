import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import { Todo } from './types/types';

export const App: React.FC = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [title, setTitle] = useState<string>('');
  const [titleError, setTitleError] = useState<boolean>(false);
  const [selectedUserIdError, setselectedUserIdError] =
    useState<boolean>(false);
  const [selectedUserId, setChoosedUserId] = useState<number>(0);

  function getUserById(userId: number) {
    return usersFromServer.find(user => user.id === userId) || null;
  }

  const addTodo = (param: Todo) => {
    setTodos(currentTodos => [...currentTodos, param]);
    setTitle('');
  };

  const handleButtonSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let hasError = false;

    if (title.trim() === '') {
      setTitleError(true);
      hasError = true;
    } else {
      setTitleError(false);
    }

    if (selectedUserId === 0) {
      setselectedUserIdError(true);
      hasError = true;
    } else {
      setselectedUserIdError(false);
    }

    const user = getUserById(selectedUserId);

    if (!hasError && user) {
      const newTodo: Todo = {
        userId: selectedUserId,
        id: todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1,
        title: title,
        completed: false,
        user: user,
      };

      addTodo(newTodo);
      setChoosedUserId(0);
      setTitle('');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={e => {
          e.preventDefault();
          handleButtonSubmit(e);
        }}
      >
        <div className="field">
          <input
            type="text"
            placeholder="Enter a title"
            value={title}
            onChange={e => {
              setTitle(e.target.value);
              setTitleError(false);
            }}
            data-cy="titleInput"
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={e => {
              setChoosedUserId(+e.target.value);
              setselectedUserIdError(false);
            }}
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

          {selectedUserIdError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList
        todos={todos.map(todo => ({
          ...todo,
          user: usersFromServer.find(user => user.id === todo.userId)!,
        }))}
      />
    </div>
  );
};
