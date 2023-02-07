import React, { ChangeEvent, FormEvent, useState } from 'react';
import './App.scss';
import { Todo } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { User } from './types/User';

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
  const [hasNoInput, setHasNoInput] = useState(true);
  const [todos, setTodos] = useState<Todo[]>(preparedTodos);

  const newId = Math.max(...todos.map(todo => todo.id)) + 1;

  const addTodo = () => {
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

      setTodos(currTodo => [...currTodo, newTodo]);
    }
  };

  const clearForm = () => {
    setInputTitle('');
    setSelectedUserId(0);
    setHasNoInput(true);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!inputTitle || !selectedUserId) {
      setHasNoInput(false);

      return;
    }

    addTodo();
    clearForm();
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(event.target.value);
  };

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
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
          {(!hasNoInput && !inputTitle) && (
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
          {(!hasNoInput && !selectedUserId) && (
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
