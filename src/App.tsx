import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import './App.scss';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const preparedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId) || null,
}));

export const App: React.FC = () => {
  const [inputTitle, setInputTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasSelectedError, setHasSelectedError] = useState(false);
  const [todos, setTodos] = useState<Todo[]>(preparedTodos);

  const newId = Math.max(...todos.map(todo => todo.id)) + 1;

  const clearForm = () => {
    setInputTitle('');
    setSelectedUserId(0);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasTitleError(!inputTitle);
    setHasSelectedError(!selectedUserId);

    const newUser = usersFromServer.find(
      user => user.id === selectedUserId,
    );

    if (newUser) {
      const newTodo = {
        id: newId,
        title: inputTitle,
        completed: false,
        userId: newUser.id,
        user: newUser,
      };

      if (inputTitle && selectedUserId) {
        setTodos(currTodo => [...currTodo, newTodo]);
        clearForm();
      }
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
    setHasSelectedError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              name="title"
              value={inputTitle}
              onChange={handleInput}
            />
          </label>
          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={selectedUserId}
              onChange={handleSelect}
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
          {hasSelectedError && (
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
