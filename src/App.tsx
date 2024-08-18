import './App.scss';
import { ChangeEvent, useState, FormEvent } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { User } from './types/User';
import React from 'react';

export const initialTodos = todosFromServer.map(todo => {
  const user = usersFromServer.find(u => u.id === todo.userId) || null;

  return {
    ...todo,
    user,
  };
});

export const App = () => {
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [selectedUserError, setSelectedUserError] = useState(false);
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const resetForm = () => {
    setTitle('');
    setSelectedUser('');
    setHasTitleError(false);
    setSelectedUserError(false);
  };

  const validateForm = (): boolean => {
    let hasErrors = false;

    if (!title.trim()) {
      setHasTitleError(true);
      hasErrors = true;
    }

    if (!selectedUser) {
      setSelectedUserError(true);
      hasErrors = true;
    }

    return hasErrors;
  };

  const createNewTodo = (): Todo => {
    const nextTodoId =
      todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;

    return {
      id: nextTodoId,
      title: title.trim(),
      completed: false,
      userId: Number(selectedUser),
      user:
        usersFromServer.find(user => user.id === Number(selectedUser)) || null,
    };
  };

  const handleSubmitButton = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validateForm()) {
      return;
    }

    const newTodo = createNewTodo();

    setTodos(prevTodos => [...prevTodos, newTodo]);
    resetForm();
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    if (hasTitleError) {
      setHasTitleError(false);
    }
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(event.target.value);
    if (selectedUserError) {
      setSelectedUserError(false);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmitButton}>
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            id="titleInput"
            placeholder="Please enter a title"
            value={title}
            onChange={handleTitleChange}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            data-cy="userSelect"
            id="userSelect"
            value={selectedUser}
            onChange={handleSelectChange}
          >
            <option value="" disabled>
              Choose a user
            </option>
            {usersFromServer.map((user: User) => (
              <option key={user.id} value={user.id.toString()}>
                {user.name}
              </option>
            ))}
          </select>

          {selectedUserError && (
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
