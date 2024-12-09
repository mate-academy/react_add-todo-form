import './App.scss';
import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [newTodoUser, setNewTodoUser] = useState(0);
  const [hasUserError, setHasUserError] = useState(false);

  const [todos, setTodos] = useState<Todo[]>(initialTodos);

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
      const newTodo: Todo = {
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
