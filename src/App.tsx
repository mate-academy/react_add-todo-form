import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState, useMemo } from 'react';
import { TodoList } from './components/TodoList';
import type { Todo } from './types';

export const App = () => {
  const [users] = useState(usersFromServer);

  // Подготавливаем данные: объединяем todos с users
  const preparedTodos = useMemo(() => {
    return todosFromServer.map(todo => {
      const user = users.find(currentUser => currentUser.id === todo.userId);

      if (!user) {
        throw new Error(`User with id ${todo.userId} not found`);
      }

      return {
        ...todo,
        user,
      };
    });
  }, [users]);

  const [todos, setTodos] = useState<Todo[]>(preparedTodos);

  // Состояние формы
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);

  // Состояние ошибок валидации
  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');

  // Обработчик изменения поля title
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    // Опционально: фильтрация ввода (только буквы, цифры, пробелы)
    const filteredValue = value.replace(/[^\p{L}\p{N}\s]/gu, '');

    setTitle(filteredValue);

    // Очищаем ошибку при изменении
    if (titleError) {
      setTitleError('');
    }
  };

  // Обработчик изменения выбора пользователя
  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(event.target.value);

    setSelectedUserId(value);

    // Очищаем ошибку при изменении
    if (userError) {
      setUserError('');
    }
  };

  // Обработчик отправки формы
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Валидация
    let hasError = false;

    if (!title.trim()) {
      setTitleError('Please enter a title');
      hasError = true;
    }

    if (selectedUserId === 0) {
      setUserError('Please choose a user');
      hasError = true;
    }

    // Если есть ошибки, не добавляем todo
    if (hasError) {
      return;
    }

    // Находим максимальный id в массиве todos
    const maxId =
      todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) : 0;

    // Находим выбранного пользователя
    const selectedUser = users.find(user => user.id === selectedUserId);

    if (!selectedUser) {
      setUserError('Please choose a user');

      return;
    }

    // Создаем новый todo
    const newTodo: Todo = {
      id: maxId + 1,
      title: title.trim(),
      completed: false,
      userId: selectedUserId,
      user: selectedUser,
    };

    // Добавляем новый todo в список
    setTodos([...todos, newTodo]);

    // Очищаем форму
    setTitle('');
    setSelectedUserId(0);
    setTitleError('');
    setUserError('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title:</label>
          <input
            type="text"
            id="titleInput"
            data-cy="titleInput"
            placeholder="Enter todo title"
            value={title}
            onChange={handleTitleChange}
          />
          {titleError && <span className="error">{titleError}</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User:</label>
          <select
            id="userSelect"
            data-cy="userSelect"
            value={selectedUserId}
            onChange={handleUserChange}
          >
            <option value={0} disabled>
              Choose a user
            </option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {userError && <span className="error">{userError}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
