import './App.scss';
import React, { useState, FormEvent, ChangeEvent } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { User, Todo } from './types';

const findUserById = (userId: number) =>
  usersFromServer.find(user => user.id === userId);

const todosWithUser = todosFromServer.map(todo => ({
  ...todo,
  user: findUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(todosWithUser);
  const [title, setTitle] = useState<string>('');
  const [userId, setUserId] = useState<number>(0);
  const [isTitleError, setIsTitleError] = useState<boolean>(false);
  const [isUserError, setIsUserError] = useState<boolean>(false);

  const resetErrors = () => {
    setIsTitleError(false);
    setIsUserError(false);
  };

  const resetForm = () => {
    setTitle('');
    setUserId(0);
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setIsTitleError(false);
  };

  const handleUserChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(e.target.value));
    setIsUserError(false);
  };

  const isFormValid = () => {
    const hasTitle = title.trim();
    const hasUser = userId !== 0;

    if (!hasTitle) {
      setIsTitleError(true);
    }

    if (!hasUser) {
      setIsUserError(true);
    }

    return hasTitle && hasUser;
  };

  const handleAddTodo = (event: FormEvent) => {
    event.preventDefault();
    resetErrors();

    if (isFormValid()) {
      const newTodo: Todo = {
        id: Math.max(...todos.map(todo => todo.id)) + 1,
        title,
        completed: false,
        user: findUserById(userId),
        userId,
      };

      setTodos(prevTodos => [...prevTodos, newTodo]);
      resetForm();
    }
  };

  return (
    <div className="App">
      <h1>Add TODO Form</h1>

      <form onSubmit={handleAddTodo}>
        <div className="field">
          <label htmlFor="titleInput">Title</label>
          <input
            type="text"
            id="titleInput"
            data-cy="titleInput"
            placeholder="Enter TODO title"
            value={title}
            onChange={handleTitleChange}
          />
          {isTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User</label>
          <select
            id="userSelect"
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map((user: User) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {isUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={todos} />
      </section>
    </div>
  );
};
