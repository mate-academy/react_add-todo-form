import React, { useState, FormEvent } from 'react';
import { Todo, User } from '../src/types/Todo';
import { TodoList } from '../src/components/TodoList/TodoList';
import usersFromServer from '../src/api/users';
import todosFromServer from '../src/api/todos';
import './App.scss';
export const App: React.FC = () => {
  // --- ZARZĄDZANIE STANEM ---
  const [todos, setTodos] = useState<Todo[]>(() => {
    return todosFromServer.map((todo: Todo) => ({
      ...todo,
      // Poprawka: Dodajemy typ 'User' do parametru 'user'.
      user: usersFromServer.find((user: User) => user.id === todo.userId),
    }));
  });

  const [users] = useState<User[]>(usersFromServer);

  // Stan dla pól formularza
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('0');

  // Stan dla błędów walidacji
  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');

  // --- OBSŁUGA ZDARZEŃ ---
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = event.target.value.replace(
      /[^a-zA-Zа-яА-Я0-9\s]/g,
      '',
    );

    setNewTodoTitle(sanitizedValue);
    if (titleError) {
      setTitleError('');
    }
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(event.target.value);
    if (userError) {
      setUserError('');
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    // Walidacja
    const isTitleValid = newTodoTitle.trim() !== '';
    const isUserValid = selectedUserId !== '0';

    setTitleError(isTitleValid ? '' : 'Please enter a title');
    setUserError(isUserValid ? '' : 'Please choose a user');

    if (!isTitleValid || !isUserValid) {
      return;
    }

    // Tworzenie nowego TODO
    // Poprawka: Dodajemy typ 'User' do parametru 'user'.
    const selectedUser = users.find(
      (user: User) => user.id === +selectedUserId,
    );

    if (!selectedUser) {
      return;
    }

    // Poprawka: Dodajemy typ 'Todo' do parametru 't'.
    const maxId = Math.max(0, ...todos.map((t: Todo) => t.id));
    const newTodo: Todo = {
      id: maxId + 1,
      title: newTodoTitle.trim(),
      userId: +selectedUserId,
      completed: false,
      user: selectedUser,
    };

    // Aktualizacja stanu i czyszczenie formularza
    setTodos(currentTodos => [...currentTodos, newTodo]);
    setNewTodoTitle('');
    setSelectedUserId('0');
  };

  // --- RENDEROWANIE ---
  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title-input" className="label">
            Title
          </label>
          <input
            id="title-input"
            type="text"
            data-cy="titleInput"
            placeholder="Enter todo title"
            className="input"
            value={newTodoTitle}
            onChange={handleTitleChange}
          />
          {titleError && <span className="error">{titleError}</span>}
        </div>

        <div className="field">
          <label htmlFor="user-select" className="label">
            User
          </label>
          <select
            id="user-select"
            data-cy="userSelect"
            className="input"
            value={selectedUserId}
            onChange={handleUserChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {/* Poprawka: Dodajemy typ 'User' do parametru 'user'. */}
            {users.map((user: User) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {userError && <span className="error">{userError}</span>}
        </div>

        <button type="submit" data-cy="submitButton" className="button">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
