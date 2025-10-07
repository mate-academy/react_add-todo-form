import './App.scss';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import { Todo } from './components/types';
import { users } from './api/users';
import { createTodo } from './components/createList';
import todosData from './api/todosData';

export const App: React.FC = () => {
  const enrichedTodos = todosData
    .map(todoItem => ({
      ...todoItem,
      user: users.find(userItem => userItem.id === todoItem.userId)
    }))
    .filter(todoItem => todoItem.user !== undefined) as Todo[];

  const [todos, setTodos] = useState<Todo[]>(enrichedTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState<number>(0);
  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');

  const handleSubmit = (submitEvent: React.FormEvent) => {
    submitEvent.preventDefault();

    let hasError = false;

    if (!title.trim()) {
      setTitleError('Please enter a title');
      hasError = true;
    }

    if (userId === 0) {
      setUserError('Please choose a user');
      hasError = true;
    }

    if (hasError) return;

    const matchedUser = users.find(userItem => userItem.id === userId);
    if (!matchedUser) return;

    const newTodo = createTodo(title, userId, todos);
    const todoWithUser = { ...newTodo, user: matchedUser };

    setTodos([...todos, todoWithUser]);

    setTitle('');
    setUserId(0);
    setTitleError('');
    setUserError('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Task Title</label>
          <input
            type="text"
            id="titleInput"
            value={title}
            onChange={(changeEvent) => {
              setTitle(changeEvent.target.value);
              setTitleError('');
            }}
            placeholder="Enter a task"
          />
          {titleError && <span className="error">{titleError}</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">Assign to User</label>
          <select
            id="userSelect"
            value={userId}
            onChange={(changeEvent) => {
              setUserId(Number(changeEvent.target.value));
              setUserError('');
            }}
          >
            <option value={0} disabled>
              Choose a user
            </option>
            {users.map(userItem => (
              <option key={userItem.id} value={userItem.id}>
                {userItem.name}
              </option>
            ))}
          </select>
          {userError && <span className="error">{userError}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
