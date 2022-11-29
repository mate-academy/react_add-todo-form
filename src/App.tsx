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
  const [TodoTitle, setTodoTitle] = useState('');
  const [isPressed, setIsPressed] = useState(false);
  const [UserId, setUserId] = useState(0);

  const userRuleErr = isPressed && UserId === 0;
  const titleRuleErr = isPressed && TodoTitle.length === 0;

  const handleAddTodo = () => {
    const id = preparedTodo.map(todo => todo.id);

    if (TodoTitle.length > 0 && TodoTitle.trim() && UserId !== 0) {
      const newTodo: Todo = {
        id: Math.max(...id) + 1,
        title: TodoTitle,
        userId: UserId,
        completed: false,
        user: getUserByID(UserId),
      };

      setPreparedTodo(state => [...state, newTodo]);
      setTodoTitle('');
      setUserId(0);
    }
  };

  const addingAndCheckingTodo = () => {
    handleAddTodo();

    if (TodoTitle.length !== 0 && UserId !== 0) {
      setIsPressed(false);
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
  };

  const handleButtonSubmit = (event:
  React.MouseEvent<HTMLButtonElement,
  MouseEvent>) => {
    event.preventDefault();
    setIsPressed(true);
    addingAndCheckingTodo();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST">
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={TodoTitle}
            onChange={handleTitleChange}
            placeholder="Enter a title"
            required
          />
          {titleRuleErr && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            value={UserId}
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

          {userRuleErr && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={handleButtonSubmit}
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
