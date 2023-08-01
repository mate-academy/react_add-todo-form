import React, { FormEvent, useState } from 'react';

import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/todos';
import { User } from './types/users';

const initialTodos = todosFromServer.map(todo => {
  const user = usersFromServer.find(userFromServer => userFromServer.id
    === todo.userId || null);

  return { ...todo, user };
});

export const App = () => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const newTodoId = Math.max(...todosFromServer.map(todo => todo.id));

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
    setHasUserIdError(false);
  };

  const addTodo = (newTodo: Todo) => {
    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  const findUser = (usersArr: User[]) => {
    const currentUser = usersArr.find(user => user.id
      === userId || null);

    return currentUser;
  };

  const clear = () => {
    setTitle('');
    setUserId(0);
    setHasTitleError(false);
    setHasUserIdError(false);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    let trimmedTitle = title;

    if (title.length !== title.trim().length) {
      trimmedTitle = title.trim();
    }

    setHasTitleError(!trimmedTitle);
    setHasUserIdError(userId === 0);

    if (!trimmedTitle || userId === 0) {
      return;
    }

    const newTodo = {
      user: findUser(usersFromServer),
      id: newTodoId + 1,
      title,
      completed: false,
      userId,
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
        onSubmit={handleSubmit}
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
            value={userId}
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

          {hasUserIdError && (
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
