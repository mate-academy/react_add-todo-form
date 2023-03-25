import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

function getUser(userId: number) {
  const foundUser = usersFromServer.find(todo => todo.id === userId);

  return foundUser || null;
}

const todos = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [inputTitle, setInputTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [newTodos, setNewTodos] = useState(todos);
  const [titleError, setTitleError] = useState(false);
  const [selectUserError, setSelectUserError] = useState(false);

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(e.target.value);
    setTitleError(false);
  };

  const handleSelectUser = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+e.target.value);
    setSelectUserError(false);
  };

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();

    setTitleError(!inputTitle);
    setSelectUserError(!selectedUserId);

    const newTodoId = Math.max(...newTodos.map(todo => todo.id)) + 1;

    const newTodo = {
      id: newTodoId,
      title: inputTitle,
      userId: selectedUserId,
      completed: false,
      user: getUser(selectedUserId),
    };

    if (inputTitle && selectedUserId) {
      setNewTodos([...newTodos, newTodo]);
      setInputTitle('');
      setSelectedUserId(0);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleAddTodo}
      >
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={inputTitle}
              onChange={handleTitle}
            />
          </label>

          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={selectedUserId}
              onChange={handleSelectUser}
            >
              <option value="0" disabled>Choose a user</option>

              {usersFromServer.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {selectUserError
            && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={newTodos} />
    </div>
  );
};
