import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';

export const App = () => {
  // Estado para os todos e campos do formulário
  const [todos, setTodos] = useState(
    todosFromServer.map(todo => ({
      ...todo,
      user: usersFromServer.find(u => u.id === todo.userId),
    })),
  );
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  // Limpa caracteres inválidos do título
  const sanitizeTitle = (value: string) => {
    return value.replace(/[^a-zA-Zа-яА-ЯёЁіІїЇєЄ0-9 ]/g, '');
  };

  // Manipulador de envio do formulário
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    let hasError = false;

    if (!title.trim()) {
      setTitleError(true);
      hasError = true;
    }

    if (!userId) {
      setUserError(true);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    // Cria novo TODO
    const newId = Math.max(0, ...todos.map(todo => todo.id)) + 1;
    const user = usersFromServer.find(u => u.id === +userId);

    const newTodo = {
      id: newId,
      title: title.trim(),
      userId: +userId,
      completed: false,
      user,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setUserId('');
    setTitleError(false);
    setUserError(false);
  };

  // Manipuladores de mudança dos campos
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleError(false);
    setTitle(sanitizeTitle(event.target.value));
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserError(false);
    setUserId(event.target.value);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title</label>
          <input
            id="titleInput"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User</label>
          <select
            id="userSelect"
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
          >
            <option value="">Choose a user</option>
            {usersFromServer.map(u => (
              <option key={u.id} value={u.id}>
                {u.name}
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
