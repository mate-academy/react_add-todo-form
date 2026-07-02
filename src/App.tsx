import './App.scss';
import React from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

export const App = () => {
  // Готуємо початковий список завдань, одразу додаючи до кожного об'єкт користувача
  const initialTodos = todosFromServer.map(todo => {
    const foundUser = usersFromServer.find(user => user.id === todo.userId);

    return { ...todo, user: foundUser };
  });

  // Створюємо стани для полів форми, списку завдань та помилок
  const [title, setTitle] = React.useState('');
  const [userId, setUserId] = React.useState(0);
  const [todos, setTodos] = React.useState(initialTodos);
  const [titleError, setTitleError] = React.useState(false);
  const [userError, setUserError] = React.useState(false);

  // Обробники, які оновлюють стан і скидають помилки при зміні полів
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
    setUserError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Валідація: встановлюємо помилки, якщо поля порожні
    if (!title) {
      setTitleError(true);
    }

    if (!userId) {
      setUserError(true);
    }

    // Якщо хоча б одне поле не валідне, перериваємо виконання
    if (!title || !userId) {
      return;
    }

    // Знаходимо користувача та максимальний ID для нового завдання
    const foundUser = usersFromServer.find(user => user.id === userId);
    const maxId = Math.max(...todos.map(currentTodo => currentTodo.id));

    // Додаємо нове завдання в список
    setTodos(prevTodos => [
      ...prevTodos,
      {
        userId,
        id: maxId + 1,
        title,
        completed: false,
        user: foundUser, // Додаємо повний об'єкт користувача
      },
    ]);

    // Очищуємо форму
    setTitle('');
    setUserId(0);
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
            <option value={0} disabled>
              Choose a user
            </option>
            {usersFromServer.map(currentUser => (
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
