import React, { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { getNewTodoId, getUserById } from './components/helpers/helpers';

const preparedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(usersFromServer, todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState(preparedTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [isTitleValid, setIsTitleValid] = useState(false);
  const [isUserValid, setIsUserValid] = useState(false);

  const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!userId) {
      setIsUserValid(true);
    }

    if (!title.trim()) {
      setIsTitleValid(true);
    }

    if (!userId || !title.trim()) {
      return;
    }

    const newTodo: Todo = {
      id: getNewTodoId(todos),
      completed: false,
      user: getUserById(usersFromServer, Number(userId)),
      title: title.trim(),
      userId: Number(userId),
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setUserId(0);
  };

  const changeTitle = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setIsTitleValid(false);
    setTitle(event.target.value);
  };

  const changeUser = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setIsUserValid(false);
    setUserId(+event.target.value);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleAddTodo}
      >
        <div className="field">
          <label>
            Title:
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={changeTitle}
            />
          </label>

          {isTitleValid && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            User:
            <select
              data-cy="userSelect"
              value={userId}
              onChange={changeUser}
            >
              <option value="0" disabled>
                Choose a user
              </option>
              {usersFromServer.map(user => ((
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              )))}
            </select>
          </label>

          {isUserValid && <span className="error">Please choose a user</span>}
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
