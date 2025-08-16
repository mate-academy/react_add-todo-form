import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { Todo, User } from './types';
import { TodoList } from './components/TodoList';
// import todos from './api/todos';

// Збагачуємо дані todos, додаючи до кожного об'єкт user
const enrichedTodos: Todo[] = todosFromServer.map(todo => {
  const user = usersFromServer.find(u => u.id === todo.userId);

  return {
    ...todo,
    user: user as User,
  };
});

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(enrichedTodos);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [users, setUsers] = useState<User[]>(usersFromServer);

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0); // 0 означає "не обрано"
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    let isValid = true;

    if (!title.trim()) {
      setTitleError(true);
      isValid = false;
    }

    if (userId === 0) {
      setUserError(true);
      isValid = false;
    }

    if (isValid) {
      // 1. Знаходимо користувача
      const user = users.find(u => u.id === userId);

      if (!user) {
        return; // На всяк випадок, якщо користувача не знайдено
      }

      // 2. Створюємо новий todo
      const newTodo = {
        id: Math.max(...todos.map(t => t.id)) + 1, // Генеруємо унікальний ID
        title,
        userId,
        completed: false,
        user,
      };

      // 3. Додаємо новий todo до списку
      setTodos([...todos, newTodo]);

      // 4. Очищаємо форму
      setTitle('');
      setUserId(0);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title</label>
          <input
            id="titleInput"
            type="text"
            data-cy="titleInput"
            value={title} // Контролюємо значення
            onChange={e => {
              // Видаляємо всі символи, крім літер, цифр і пробілів
              const sanitizedTitle = e.target.value.replace(/[^a-zA-Z0-9\sа-яА-ЯёЁїІЇєЄґҐ]/g, '');
              setTitle(sanitizedTitle);
              setTitleError(false);
            }}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User</label>
          <select
            id="userSelect"
            data-cy="userSelect"
            value={userId}
            onChange={e => {
              setUserId(+e.target.value); // + перетворює рядок на число
              setUserError(false); // Ховаємо помилку при зміні
            }}
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
