import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { getNewPostId } from './utils/todoUtiles';

export const App = () => {
  const [currentTodos, setCurrentTodos] = useState(todosFromServer);
  const [newTitle, setNewTitle] = useState('');
  const [titleValidation, setTitleValidation] = useState(false);
  const [newUserId, setNewUserId] = useState(0);
  const [userValidation, setUserValidation] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;

    setTitleValidation(!input.trim());
    setNewTitle(input);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const input = event.target.value;

    setUserValidation(!input);
    setNewUserId(+input);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setTitleValidation(!newTitle.trim());
    setUserValidation(!newUserId);

    if (!newTitle.trim() || !newUserId) {
      return;
    }

    const newTodo = {
      id: getNewPostId(currentTodos),
      title: newTitle,
      completed: false,
      userId: newUserId,
    };

    const newTodoList = [...currentTodos, newTodo];

    setCurrentTodos(newTodoList);

    setNewTitle('');
    setNewUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            data-cy="titleInput"
            value={newTitle}
            placeholder="Enter a title"
            onChange={handleTitleChange}
          />
          {titleValidation
          && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            data-cy="userSelect"
            id="userSelect"
            value={newUserId}
            onChange={handleUserChange}
          >
            <option value="0">Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id}>{user.name}</option>
            ))}
          </select>

          {userValidation
          && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={currentTodos} />
    </div>
  );
};
