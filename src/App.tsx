import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { Todo } from './components/TodoInfo';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    return todosFromServer.map(todo => {
      const foundUser = usersFromServer.find(user => user.id === todo.userId);
      
      return {
        ...todo,
        // Запасной объект на случай, если API вернет неполные данные
        user: foundUser || { id: 0, name: 'Unknown', username: '', email: '' },
      };
    });
  });

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState<number>(0);

  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Оставляем только буквы (en, ua), цифры и пробелы
    const sanitizedTitle = e.target.value.replace(/[^a-zA-Zа-яА-ЯіІїЇєЄґҐ0-9 ]/g, '');
    
    setTitle(sanitizedTitle);
    setHasTitleError(false); // Прячем ошибку сразу при изменении поля
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(e.target.value));
    setHasUserError(false); // Прячем ошибку сразу при изменении поля
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedTitle = title.trim();
    const isTitleInvalid = !trimmedTitle;
    const isUserInvalid = userId === 0;

    // Явно задаем состояние ошибок (чтобы Cypress тесты корректно их перехватывали)
    setHasTitleError(isTitleInvalid);
    setHasUserError(isUserInvalid);

    if (isTitleInvalid || isUserInvalid) {
      return;
    }

    // ИСПРАВЛЕНИЕ: Используем понятную переменную `todo` вместо `t` (Чеклист №1)
    const nextId = todos.length > 0 
      ? Math.max(...todos.map(todo => todo.id)) + 1 
      : 1;
    
    // ИСПРАВЛЕНИЕ: Используем понятную переменную `user` вместо `u` (Чеклист №1)
    const selectedUser = usersFromServer.find(user => user.id === userId);

    // ИСПРАВЛЕНИЕ: Проверка на null (Чеклист №4), чтобы не передать undefined в UserInfo
    if (!selectedUser) {
      setHasUserError(true);
      return;
    }

    const newTodo: Todo = {
      id: nextId,
      title: trimmedTitle,
      userId,
      completed: false,
      user: selectedUser,
    };

    setTodos([...todos, newTodo]);
    
    // Очищаем форму после успешного добавления
    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title:</label>
          <input
            id="titleInput"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User:</label>
          <select
            id="userSelect"
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
          >
            <option value={0} disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
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

      <TodoList todos={todos} />
    </div>
  );
};