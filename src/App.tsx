import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todo } from './types/Todo';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find((user: User) => (
    user.id === userId
  ));

  return foundUser || null;
}

const visibleTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [isTitleValid, setIsTitleValid] = useState(false);
  const [isNameValid, setIsNameValid] = useState(false);
  const [todos, setTodos] = useState(visibleTodos);

  const handleQueryChange = ((event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);

    setIsTitleValid(false);
  });

  const handleSelectChange = ((event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(+event.target.value);

    setIsNameValid(false);
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.length || !selectedUser) {
      if (!selectedUser) {
        setIsNameValid(true);
      }

      if (!title.length) {
        setIsTitleValid(true);
      }

      return;
    }

    const getNewId = Math.max(...todos.map(todo => todo.id)) + 1;

    const newTodo = {
      id: getNewId,
      title,
      completed: false,
      userId: selectedUser,
      user: getUser(selectedUser),
    };

    if (title.trim() && selectedUser) {
      setTodos((currentTodos) => [
        ...currentTodos,
        newTodo,
      ]);

      setTitle('');
      setSelectedUser(null);
    }
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
          <label htmlFor="titleInput">Title: </label>
          <input
            id="titleInput"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleQueryChange}
          />
          {isTitleValid && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            data-cy="userSelect"
            id="userSelect"
            value={selectedUser?.toString() || ''}
            onChange={handleSelectChange}
          >
            <option
              value=""
              disabled
            >
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {isNameValid && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
