import React, { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './components/types/todo';

const getUserById = (userId: number) => {
  return usersFromServer.find(user => user.id === userId) || null;
};

const preparedTodo: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

const newTodoId: number = Math.max(
  ...todosFromServer.map(todo => todo.id),
) + 1;

export const App = () => {
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);
  const [todos, setTodos] = useState(preparedTodo);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) {
      setHasTitleError(true);
    }

    if (!selectedUserId) {
      setHasUserError(true);
    }

    if (!title.trim() || !selectedUserId) {
      return;
    }

    const newTodo = {
      id: newTodoId,
      title: title.trim(),
      userId: Number(selectedUserId),
      completed: false,
      user: getUserById(selectedUserId),
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setSelectedUserId(0);
  };

  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setHasTitleError(false);
  };

  const changeUser = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(Number(e.target.value));
    setHasUserError(false);
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
          <label>
            {'Title: '}
            <input
              data-cy="titleInput"
              type="text"
              placeholder="Enter a title"
              value={title}
              onChange={changeTitle}
            />
            {hasTitleError
            && <span className="error">Please enter a title</span>}
          </label>
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={selectedUserId}
              onChange={changeUser}
            >
              <option value="0" disabled>
                Choose a user
              </option>
              {usersFromServer.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {hasUserError
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
