import './App.scss';
import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { TodoWithUser } from './react-app-env';

const getUserById = (userId: number) => {
  const findUser = usersFromServer.find(user => user.id === userId);

  return findUser || null;
};

const getTodoId = (todos: TodoWithUser[]) => {
  const id = Math.max(...todos.map(todo => todo.id));

  return id + 1;
};

const todosWithUser: TodoWithUser[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<TodoWithUser[]>(todosWithUser);
  const [todoTitle, setTodoTitle] = useState('');
  const [todoUserId, setTodoUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHesUserError] = useState(false);

  const resetForm = () => {
    setTodoTitle('');
    setTodoUserId(0);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimTitle = todoTitle.trim();

    setHasTitleError(!trimTitle);
    setHesUserError(!todoUserId);

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

    if (!hasTitleError && !hasUserError) {
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
    setHesUserError(false);
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
          />

          {hasTitleError && (
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
