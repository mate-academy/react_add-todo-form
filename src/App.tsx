import './App.scss';
import { TodoList } from './components/TodoList';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todos } from './types/Todos';
import { Users } from './types/Users';
import classNames from 'classnames';

// 1. Helper function (DRY - Don't Repeat Yourself)
// Гарантуємо, що завжди повертаємо об'єкт типу Users для TS
const getTodoUser = (userId: number | undefined): Users => {
  const searchUser = usersFromServer.find(user => user.id === userId);

  return {
    id: searchUser?.id || 0,
    name: searchUser?.name || '',
    username: searchUser?.username || '',
    email: searchUser?.email || '',
  };
};

// Початкові дані
const todoInfos = todosFromServer.map(todo => ({
  ...todo,
  user: getTodoUser(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  // Зберігаємо текст помилки замість просто true/false
  const [titleError, setTitleError] = useState('');

  const [userId, setUserId] = useState<number | null>(null);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const [userTodo, setUserTodo] = useState<Todos[]>(todoInfos);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(''); // Скидаємо помилку при введенні
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
    setHasUserIdError(false);
  };

  const addTodo = (event: React.FormEvent) => {
    event.preventDefault();

    // 2. Роздільна валідація Title для зрозумілого фідбеку
    const titleRegex = /^[A-Za-z0-9 ]+$/;
    let currentTitleError = '';

    if (!title.trim()) {
      currentTitleError = 'Please enter a title';
    } else if (!titleRegex.test(title)) {
      currentTitleError = 'Title should contain only letters and numbers';
    }

    const userIdIsMissing = !userId;

    setTitleError(currentTitleError);
    setHasUserIdError(userIdIsMissing);

    if (currentTitleError || userIdIsMissing) {
      return;
    }

    // Розрахунок наступного ID
    const nextId = userTodo.length > 0
      ? Math.max(...userTodo.map(todo => todo.id)) + 1
      : 1;

    const newTodo: Todos = {
      id: nextId,
      title: title.trim(),
      userId: userId!,
      completed: false,
      user: getTodoUser(userId!), // Використовуємо хелпер
    };

    setUserTodo(prev => [...prev, newTodo]);

    // Очищення форми
    setTitle('');
    setUserId(null);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={addTodo}>
        <div className="field">
          <label className="field__label" htmlFor="todo-title">
            Title
          </label>
          <input
            id="todo-title"
            className={classNames('field__input', {
              'error__field': !!titleError,
            })}
            type="text"
            data-cy="titleInput"
            placeholder="Title"
            value={title}
            onChange={handleTitleChange}
          />
          {titleError && <p className="error">{titleError}</p>}
        </div>

        <div className="field">
          <label className="field__label" htmlFor="todo-user">
            User
          </label>
          <select
            id="todo-user"
            className={classNames('field__select', {
              'error__field': hasUserIdError,
            })}
            data-cy="userSelect"
            value={userId ?? 0}
            onChange={handleUserChange}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {hasUserIdError && <p className="error">Please choose a user</p>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={userTodo} />
    </div>
  );
};