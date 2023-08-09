import React, { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId)
    || null;
}

export const App = () => {
  const [titleValue, setTitleValue] = useState('');
  const [selectedUserId, setselectedUserId] = useState(0);
  const [showTitleError, setTitleError] = useState(false);
  const [showSelectError, setSelectError] = useState(false);

  const [todos, setTodos] = useState(todosFromServer.map(todo => ({
    ...todo,
    user: getUserById(todo.userId),
  })));

  const getmaxTodoId = () => {
    return Math.max(...todos.map(todo => todo.id), 0);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    setTitleValue(newValue);
    setTitleError(false);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = +event.target.value;

    setselectedUserId(newValue);
    setSelectError(false);
  };

  const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedTitle = titleValue.trim();

    if (!trimmedTitle) {
      setTitleError(true);
    }

    if (!selectedUserId) {
      setSelectError(true);
    }

    if (trimmedTitle && selectedUserId) {
      const newTodo = {
        id: getmaxTodoId() + 1,
        title: titleValue,
        userId: selectedUserId,
        completed: false,
        user: getUserById(selectedUserId),
      };

      setTodos([...todos, newTodo]);

      setTitleValue('');
      setselectedUserId(0);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
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
              value={titleValue}
              onChange={handleTitleChange}
            />

            {showTitleError
            && <span className="error">Please enter a title</span> }
          </label>
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={selectedUserId}
              onChange={handleSelectChange}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option
                  value={user.id}
                  key={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          {showSelectError
          && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos} />

    </div>
  );
};
