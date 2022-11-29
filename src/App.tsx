import './App.scss';

import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { TodoList } from './components/TodoList';

function getUserByID(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserByID(todo.userId),
}));

export const App = () => {
  const [preparedTodo, setPreparedTodo] = useState(todos);
  const [todoTitle, setTodoTitle] = useState('');
  const [isPressed, setIsPressed] = useState(false);
  const [userId, setUserId] = useState(0);

  const userRuleErr = isPressed && userId === 0;
  const titleRuleErr = isPressed && todoTitle.trim().length === 0;

  const handleAddTodo = () => {
    const id = preparedTodo.map(todo => todo.id);

    if (todoTitle.length > 0 && todoTitle.trim() && userId !== 0) {
      const newTodo: Todo = {
        id: Math.max(...id) + 1,
        title: todoTitle,
        userId,
        completed: false,
        user: getUserByID(userId),
      };

      setPreparedTodo(state => [...state, newTodo]);
      setTodoTitle('');
      setUserId(0);
    }
  };

  const addingAndCheckingTodo = () => {
    handleAddTodo();

    if (todoTitle.trim().length !== 0 && userId !== 0) {
      setIsPressed(false);
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsPressed(true);
    addingAndCheckingTodo();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleFormSubmit}
      >
        <div className="field">
          <label>
            Title:
            <input
              type="text"
              data-cy="titleInput"
              value={todoTitle}
              onChange={handleTitleChange}
              placeholder="Enter a title"
            />
          </label>
          {titleRuleErr && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            User:
            <select
              value={userId}
              data-cy="userSelect"
              onChange={handleUserChange}
            >
              <option disabled value="0">Choose a user</option>

              {usersFromServer.map(user => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {userRuleErr && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={preparedTodo} />
      </section>
    </div>
  );
};
