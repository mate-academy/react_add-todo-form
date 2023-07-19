import './App.scss';

import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

const initialTodos = todosFromServer.map(todo => {
  const user = usersFromServer.find(
    userFromServer => userFromServer.id === todo.userId,
  );

  return { ...todo, user };
});

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [user, setUser] = useState<number>(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const newTodoId = Math.max(...todosFromServer.map(todo => todo.id));

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUser(Number(event.target.value));
    setHasUserError(false);
  };

  const addTodo = (newTodo: Todo) => {
    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  const clear = () => {
    setTitle('');
    setUser(0);
    setHasTitleError(false);
    setHasUserError(false);
  };

  const addHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserError(user === 0);

    if (!title || user === 0) {
      return;
    }

    const newTodo = {
      user: usersFromServer.find(
        userFromServer => userFromServer.id === user,
      ),
      id: newTodoId + 1,
      title,
      completed: false,
      userId: user,
    };

    addTodo(newTodo);
    clear();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={addHandler}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            placeholder="Enter a title"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
          />

          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            id="user"
            value={user}
            data-cy="userSelect"
            onChange={handleUserChange}
          >
            <option value="0" key="0" disabled>Choose a user</option>
            {usersFromServer.map(userFromServer => (
              <option value={userFromServer.id} key={userFromServer.id}>
                {userFromServer.name}
              </option>
            ))}
          </select>

          {hasUserError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
