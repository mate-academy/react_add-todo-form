import React, { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUserById(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const getTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

const getNewTodoId = (todos: Todo[]) => {
  const todoIds = todos.map(todo => todo.id);
  const maxId = Math.max(...todoIds);

  return Number.isFinite(maxId)
    ? maxId + 1
    : 1;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState(getTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [isTitleValid, setIsTitleValid] = useState(false);
  const [isUserValid, setIsUserValid] = useState(false);

  const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!userId) {
      setIsUserValid(true);
    }

    if (!title) {
      setIsTitleValid(true);
    }

    if (!userId || !title) {
      return;
    }

    const newTodo: Todo = {
      id: getNewTodoId(todos),
      completed: false,
      user: getUserById(Number(userId)),
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
