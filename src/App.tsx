import React, { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo, User } from './types/types';

export const App = () => {
  // Helper function to get a user by their ID
  const getUserById = (userId: number): User | null => {
    return usersFromServer.find(user => user.id === userId) || null;
  };

  // Initial processing of todos to include the user object
  const prepareInitialTodos = (): Todo[] => {
    return todosFromServer.map(todo => ({
      ...todo,
      user: getUserById(todo.userId),
    }));
  };

  // State initialization
  const [userList] = useState(usersFromServer);
  const [todosList, setTodosList] = useState(prepareInitialTodos());
  const [titleInput, setTitleInput] = useState('');
  const [userSelected, setUserSelected] = useState('');
  const [titleInputError, setTitleInputError] = useState(false);
  const [userSelectError, setUserSelectError] = useState(false);

  // Helper function to get the next available ID
  const getNextTodoId = (): number => {
    const allTodoIds = todosList.map(todo => todo.id);

    return Math.max(...allTodoIds, 0) + 1;
  };

  // Create a new Todo object
  const createNewTodo = (): Todo => {
    const trimmedTitle = titleInput.trim();

    return {
      id: getNextTodoId(),
      title: trimmedTitle,
      completed: false,
      userId: Number(userSelected),
      user: getUserById(Number(userSelected)),
    };
  };

  // Form input validators
  const validateTitleInput = () => {
    const isTitleEmpty = titleInput.trim() === '';

    setTitleInputError(isTitleEmpty);

    return !isTitleEmpty;
  };

  const validateUserSelection = () => {
    const isUserUnselected = userSelected === '';

    setUserSelectError(isUserUnselected);

    return !isUserUnselected;
  };

  // Reset form fields
  const resetForm = () => {
    setTitleInput('');
    setUserSelected('');
    setTitleInputError(false);
    setUserSelectError(false);
  };

  // Form submission handler
  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isTitleValid = validateTitleInput();
    const isUserValid = validateUserSelection();

    if (isTitleValid && isUserValid) {
      const newTodo = createNewTodo();

      setTodosList(prevTodos => [...prevTodos, newTodo]);

      resetForm();
    }
  };

  // Input change handlers
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = event.target.value.replace(
      /[^a-zA-Zа-яА-Я0-9 ]/g,
      '',
    );

    setTitleInput(sanitizedValue);

    if (sanitizedValue.trim() !== '') {
      setTitleInputError(false);
    }
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserSelected(event.target.value);

    if (event.target.value !== '') {
      setUserSelectError(false);
    }
  };

  return (
    <div className="App">
      <h1>Add Todo Form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleFormSubmit}>
        {/* Title Input */}
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={titleInput}
            placeholder="Enter a title"
            onChange={handleTitleChange}
          />
          {titleInputError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        {/* User Dropdown */}
        <div className="field">
          <select
            data-cy="userSelect"
            value={userSelected}
            onChange={handleUserChange}
          >
            <option value="" disabled={userSelected !== ''}>
              Choose a user
            </option>
            {userList.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {userSelectError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      {/* Todo List */}
      <TodoList todos={todosList} />
    </div>
  );
};
