import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { Todo } from './types/Todo';
import { User } from './types/User';

import { TodoList } from './components/TodoList';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const [title, setTitle] = useState<string>('');
  const [userId, setUserId] = useState<string>('');

  const [titleError, setTitleError] = useState<boolean>(false);
  const [userError, setUserError] = useState<boolean>(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    // Разрешены только буквы, цифры и пробелы
    const cleanedValue = value.replace(/[^a-zA-Zа-яА-Я0-9 ]/g, '');

    setTitle(cleanedValue);

    if (titleError) {
      setTitleError(false);
    }
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(event.target.value);

    if (userError) {
      setUserError(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let isValid = true;

    if (!title.trim()) {
      setTitleError(true);
      isValid = false;
    }

    if (!userId) {
      setUserError(true);
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const maxId = todos.length ? Math.max(...todos.map(todo => todo.id)) : 0;

    const selectedUser = usersFromServer.find(
      user => user.id === Number(userId),
    );

    if (!selectedUser) {
      setUserError(true);

      return;
    }

    const newTodo: Todo = {
      id: maxId + 1,
      title: title.trim(),
      userId: Number(userId),
      completed: false,
      user: selectedUser,
    };

    setTodos([...todos, newTodo]);

    setTitle('');
    setUserId('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />

          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
          >
            <option value="">Choose a user</option>

            {usersFromServer.map((user: User) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
