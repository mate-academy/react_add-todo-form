import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoWithUser } from './react-app-env';

const getTodoId = (todos: TodoWithUser[]) => {
  const id = Math.max(...todos.map(todo => todo.id));

  return id + 1;
};

const getUserById = (userId: number) => {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
};

const todoWithUser: TodoWithUser[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<TodoWithUser[]>(todoWithUser);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserIdError, setHasUserIdError] = useState(false);
  const [todoTitle, setTodoTitle] = useState('');
  const [todoUserId, setTodoUserId] = useState(0);

  const resetForm = () => {
    setTodoTitle('');
    setTodoUserId(0);
  };

  const handlFromSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimTitle = todoTitle.trim();

    setHasTitleError(!trimTitle);
    setHasUserIdError(!todoUserId);

    if (!trimTitle || !todoUserId) {
      return;
    }

    const newTodo: TodoWithUser = {
      id: getTodoId(todos),
      title: todoTitle,
      completed: false,
      userId: todoUserId,
      user: getUserById(todoUserId),
    };

    if (!hasTitleError && !hasTitleError) {
      setTodos(currentTodos => [...currentTodos, newTodo]);
      resetForm();
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTodoUserId(+event.target.value);
    setHasTitleError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        method="POST"
        onSubmit={handlFromSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={todoTitle}
            placeholder="Enter a title"
            onChange={handleInput}
          />
          {hasTitleError && (
            <span className="error">Please enter a title</span>)}

        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={todoUserId}
            onChange={handleSelect}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {hasUserIdError && (
            <span className="error">Please choose a user</span>)}

        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
