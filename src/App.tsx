import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoWithUser } from './react-app-env';

const getCorrectId = (todos: TodoWithUser[]) => {
  const id = Math.max(...todos.map(todo => todo.id));

  return id + 1;
};

const getUserById = (userId: number) => {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
};

const todosWithUser: TodoWithUser[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoWithUser[]>(todosWithUser);
  const [todoTitle, setTodoTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [todoUserId, setTodoUserId] = useState(0);
  const [userIdError, setUserIdError] = useState(false);

  const resetForm = () => {
    setTodoTitle('');
    setTodoUserId(0);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimTitle = todoTitle.trim();

    setTitleError(!trimTitle);
    setUserIdError(!todoUserId);

    if (!trimTitle || !todoUserId) {
      return;
    }

    const newTodo = {
      id: getCorrectId(todos),
      title: todoTitle,
      completed: false,
      userId: todoUserId,
      user: getUserById(todoUserId),
    };

    if (!titleError && !userIdError) {
      setTodos(currentTodos => [...currentTodos, newTodo]);
    }

    resetForm();
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
    setTitleError(false);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTodoUserId(+event.target.value);
    setUserIdError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        method="POST"
        onSubmit={handleFormSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={todoTitle}
            onChange={handleInput}
            placeholder="Enter todo title"
          />

          {titleError && (
            <span className="error">Please enter a title</span>
          )}
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

          {userIdError && (
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
