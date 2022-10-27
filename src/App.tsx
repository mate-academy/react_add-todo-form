import './App.scss';

import React, { useState } from 'react';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import { Todo } from './react-app-env';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [selectedUserId, setSelectedUser] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const clearForm = () => {
    setNewTodoTitle('');
    setSelectedUser(0);
  };

  const handleSubmitForm = (event: React.FormEvent) => {
    event.preventDefault();

    const newTodo = {
      id: Date.now(),
      title: newTodoTitle,
      completed: false,
      userId: selectedUserId,
    };

    if (newTodoTitle.trim() && selectedUserId) {
      setTodos(currentTodos => [...currentTodos, newTodo]);
      clearForm();
    }

    if (!newTodoTitle.trim()) {
      setHasTitleError(true);
    }

    if (!selectedUserId) {
      setHasUserIdError(true);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmitForm}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={newTodoTitle}
            placeholder="Enter todo"
            onChange={event => {
              const inputValue = event.target.value;

              setNewTodoTitle(inputValue);

              if (inputValue.trim().length <= 0) {
                setHasTitleError(true);
              } else {
                setHasTitleError(false);
              }
            }}
          />
          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={event => {
              const selectedValue = +event.target.value;

              setSelectedUser(selectedValue);

              if (selectedValue === 0) {
                setHasUserIdError(true);
              } else {
                setHasUserIdError(false);
              }
            }}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(({ id, name }) => (
              <option value={id} key={id}>{name}</option>
            ))}
          </select>

          {hasUserIdError && (
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
