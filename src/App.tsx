import './App.scss';
import React, { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { User, Todo, PreparedTodo } from './types/types';

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('0');
  const [users] = useState<User[]>(usersFromServer);
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);

  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const preparedTodos: PreparedTodo[] = todos.map(todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId)!,
  }));

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(event.target.value);
    setHasUserError(false);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isTitleValid = title.trim() !== '';
    const isUserValid = selectedUserId !== '0';

    setHasTitleError(!isTitleValid);
    setHasUserError(!isUserValid);

    if (!isTitleValid || !isUserValid) {
      return;
    }

    const newTodo: Todo = {
      id: todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1,
      title: title.trim(),
      completed: false,
      userId: +selectedUserId,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setSelectedUserId('0');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <span> Title: </span>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            data-cy="titleInput"
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <span> User: </span>
          <select
            value={selectedUserId}
            onChange={handleUserChange}
            data-cy="userSelect"
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {users.map(user => (
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

      <TodoList todos={preparedTodos} />
    </div>
  );
};
