import { Todo } from './interfaces/Todo';
import { findUserById } from './utils/findUserById';

import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { useState } from 'react';
import { TodoList } from './components/TodoList';

const initialTodos: Todo[] = todosFromServer.map(todo => {
  const user = findUserById(todo.userId);

  return {
    ...todo,
    user,
  };
});

export const App = () => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(initialTodos);

  const [selectedUserId, setSelectedUser] = useState(0);
  const [isSelectedUserError, setSelectedUserError] = useState(false);

  const [title, setTitle] = useState('');
  const [isTitleError, setTitleError] = useState(false);

  const addTodo = () => {
    setVisibleTodos(currentTodos => {
      const id = Math.max(...currentTodos.map(item => item.id)) || 1;
      const user = findUserById(selectedUserId);

      if (!user) {
        return currentTodos;
      }

      const newTodo = {
        id: id + 1,
        title,
        completed: false,
        userId: user.id,
        user,
      };

      return [...currentTodos, newTodo];
    });
  };

  const handleReset = () => {
    setTitle('');
    setSelectedUser(0);

    setSelectedUserError(false);
    setTitleError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTitleError(!title);
    setSelectedUserError(!selectedUserId);

    if (!title || !selectedUserId) {
      return;
    }

    addTodo();
    handleReset();
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    if (isTitleError) {
      setTitleError(false);
    }
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(+event.target.value);
    if (isSelectedUserError) {
      setSelectedUserError(false);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
        onReset={handleReset}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleInput}
            placeholder="Enter a title"
            id="title"
          />
          {isTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            data-cy="userSelect"
            onChange={handleUserChange}
            value={selectedUserId}
            id="user"
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
          {isSelectedUserError && (
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
