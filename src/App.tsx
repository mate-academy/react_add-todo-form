import './App.scss';
import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { TodoInfoType } from './types/TodoInfoType';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const initialTodos: TodoInfoType[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [newTodoTitle, setNewTodoTitle] = useState<string>('');
  const [hasTitleError, setHasTitleError] = useState<boolean>(false);

  const [newTodoUser, setNewTodoUser] = useState<number>(0);
  const [hasUserError, setHasUserError] = useState<boolean>(false);

  const [todos, setTodos] = useState<TodoInfoType[]>(initialTodos);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHasTitleError(false);
    setNewTodoTitle(event.target.value);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setHasUserError(false);
    setNewTodoUser(+event.target.value);
  };

  const resetForm = () => {
    setNewTodoTitle('');
    setNewTodoUser(0);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasTitleError(!newTodoTitle);
    setHasUserError(!newTodoUser);

    if (newTodoTitle && newTodoUser) {
      const newTodo: TodoInfoType = {
        id: Math.max(...todos.map(todo => todo.id)) + 1,
        title: newTodoTitle,
        completed: false,
        userId: newTodoUser,
        user: getUserById(newTodoUser),
      };

      setTodos(prev => [...prev, newTodo]);
      resetForm();
    }
  };

  return (
    <div className="App">
      <h1 className="App__title">Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            value={newTodoTitle}
            onChange={handleTitleChange}
            data-cy="titleInput"
            placeholder="Enter a title"
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            name="user"
            data-cy="userSelect"
            value={newTodoUser}
            onChange={handleUserChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
