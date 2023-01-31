import React, { useState } from 'react';
import './App.scss';
import { Todo } from './types/Todo';
import { User } from './types/User';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [isTitleEntered, setIsTitleEntered] = useState(true);
  const [isUserSelected, setIsUserSelected] = useState(true);
  const [currentTodos, setCurrentTodos] = useState(todos);

  function addTodo(id: number) {
    const newId = Math.max(...currentTodos.map(todo => todo.id)) + 1;

    if (title.trim() && getUser(id)) {
      const newTodo = {
        id: newId,
        title,
        userId,
        completed: false,
        user: getUser(userId),
      };

      setUserId(0);
      setTitle('');
      setCurrentTodos([...currentTodos, newTodo]);
    }

    if (!title.trim()) {
      setIsTitleEntered(false);
    }

    if (!userId) {
      setUserId(0);
      setIsUserSelected(false);
    }
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTodo(userId);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitleEntered(true);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setIsUserSelected(true);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleFormSubmit}
      >
        <div className="field">
          <label htmlFor="text_input">Title: </label>
          <input
            type="text"
            id="text_input"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
          {!isTitleEntered && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="select_label">User: </label>
          <select
            data-cy="userSelect"
            id="select_label"
            value={userId}
            onChange={handleUserChange}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>

          {!isUserSelected && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={currentTodos} />
    </div>
  );
};
