import './App.scss';
import React, { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/types';
import { getUserById } from './servises/servises';

export const App = () => {
  const initialTodo: Todo[] = todosFromServer.map(todoFromServer => ({
    ...todoFromServer,
    user: getUserById(todoFromServer.userId),
  }));
  // const users: User[] = usersFromServer;
  //#region UseStates
  const [todos, setTodos] = useState<Todo[]>(initialTodo);
  const [userId, setUserId] = useState(0);

  const [userIdError, setUserIdError] = useState('');

  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');

  // const [count, setCount] = useState(0);
  //#endregion UseStates

  //#region Handlers
  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserIdError('');
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError('');
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const getNewTodoId = (todos: Todo[]) => {
    if (todos.length === 0) {
      return 1;
    }

    return Math.max(...todos.map(todo => todo.id)) + 1;
  };

  const addTodo = (newTodo: Todo) => {
    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  const validation = () => {
    let isValid = true;
    const pattern = /^[а-яА-Яa-zA-Z0-9 ]+$/;

    if (!title) {
      setTitleError('Please enter a title');
      isValid = false;
    } else if (!pattern.test(title)) {
      setTitleError('Please enter a valid text');
      isValid = false;
    }

    if (userId === 0) {
      setUserIdError('Choose a user');
      isValid = false;
    }

    return isValid;
  };

  const reset = () => {
    setTitle('');
    setUserId(0);
    setTitleError('');
    setUserIdError('');

    // setCount(prev => prev + 1);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validation()) {
      return;
    }

    addTodo({
      title,
      userId,
      id: getNewTodoId(todos),
      completed: false,
      user: getUserById(userId),
    });

    reset();
  };
  //#endregion Handlers

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
        // key={count}
      >
        <div className="field">
          <label>
            Title:{' '}
            <input
              type="text"
              data-cy="titleInput"
              value={title}
              onChange={handleTitleChange}
              required
            />
          </label>

          {titleError && <span className="error">{titleError}</span>}
        </div>

        <div className="field">
          <label htmlFor="select">User:</label>

          <select
            data-cy="userSelect"
            id="select"
            value={userId}
            onChange={handleUserChange}
            required
          >
            <option value="0">Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userIdError && <span className="error">{userIdError}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
