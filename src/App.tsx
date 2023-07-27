import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './Types/Todo';

const initialUser = (userId: number) => {
  return usersFromServer.find((user) => user.id === userId) || null;
};

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: initialUser(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [todos, setTodos] = useState(initialTodos);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [userError, setUserError] = useState(false);

  const resetForm = () => {
    setTitle('');
    setTitleError(false);
    setSelectedUserId(0);
    setUserError(false);
  };

  const addTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value.trimStart());
    setTitleError(false);
  };

  const addUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
    setUserError(false);
  };

  const addTodo = (todo: Todo) => {
    setTodos(existTodos => [...existTodos, todo]);
  };

  const maxIdNumber = Math.max(...todos.map(todo => todo.id));

  const addNewPost = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTitleError(!title);
    setUserError(!selectedUserId);

    if (!title || !selectedUserId) {
      return;
    }

    addTodo({
      id: maxIdNumber + 1,
      title,
      completed: false,
      userId: selectedUserId,
      user: initialUser(selectedUserId),
    });

    resetForm();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={addNewPost}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={addTitle}
          />

          {titleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            id="user"
            data-cy="userSelect"
            value={selectedUserId}
            onChange={addUser}
          >
            <option value="0" key={0} disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
