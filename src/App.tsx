import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { Todo, User } from './components/TodoInfo/TodoInfo';

const initialTodos: Todo[] = todosFromServer.map(todo => {
  const user = usersFromServer.find(u => u.id === todo.userId);

  return {
    ...todo,
    user: user as User,
  };
});

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');

  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    value = value.replace(/[^a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ0-9 ]/g, '');
    setTitle(value);

    if (titleError) {
      setTitleError(false);
    }
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(e.target.value);

    if (userError) {
      setUserError(false);
    }
  };

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isTitleEmpty = !title.trim();
    const isUserEmpty = !userId;

    setTitleError(isTitleEmpty);
    setUserError(isUserEmpty);

    if (isTitleEmpty || isUserEmpty) {
      return;
    }

    const selectedUser = usersFromServer.find(
      user => user.id === Number(userId),
    );

    if (!selectedUser) {
      return;
    }

    const maxId = todos.reduce(
      (max, todo) => (todo.id > max ? todo.id : max),
      0,
    );

    const newTodo: Todo = {
      id: maxId + 1,
      userId: Number(userId),
      title: title.trim(),
      completed: false,
      user: {
        id: selectedUser.id,
        name: selectedUser.name,
        username: selectedUser.username,
        email: selectedUser.email,
      },
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
    setTitle('');
    setUserId('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleAddTodo}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter title"
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
          >
            <option value="" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={String(user.id)}>
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

      {/* Теперь передаем только todos */}
      <TodoList todos={todos} />
    </div>
  );
};
