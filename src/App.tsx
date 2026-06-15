import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
  user: User;
}

interface ServerTodo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

export const App: React.FC = () => {
  const users: User[] = usersFromServer as User[];

  const preparedTodos: Todo[] = (todosFromServer as ServerTodo[]).map(currentTodo => {
    const associatedUser = users.find(
      currentUser => currentUser.id === currentTodo.userId,
    );

    return {
      ...currentTodo,
      user: associatedUser || {
        id: 0,
        name: 'Unknown',
        username: 'unknown',
        email: '',
      },
    };
  });

  const [todos, setTodos] = useState<Todo[]>(preparedTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState<number | string>('');

  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    const cleanValue = inputValue.replace(/[^A-Za-zА-Яа-яЁёІіЇїЄєҐґ0-9 ]/g, '');

    setTitle(cleanValue);
    setTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;

    setUserId(selectedValue === '' ? '' : Number(selectedValue));
    setUserError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isTitleEmpty = title.trim().length === 0;
    const isUserEmpty = userId === '';

    setTitleError(isTitleEmpty);
    setUserError(isUserEmpty);

    if (isTitleEmpty || isUserEmpty) {
      return;
    }

    const foundUser = users.find(
      currentUser => currentUser.id === Number(userId),
    );

    if (!foundUser) {
      return;
    }

    const maxId = todos.reduce(
      (maxExistingId, currentTodo) => Math.max(maxExistingId, currentTodo.id),
      0,
    );

    const newTodo: Todo = {
      id: maxId + 1,
      title: title.trim(),
      userId: Number(userId),
      completed: false,
      user: foundUser,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);

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
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter todo title"
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
            {users.map(currentUser => (
              <option key={currentUser.id} value={currentUser.id}>
                {currentUser.name}
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

export default App;
