import './App.scss';
import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User, Todo } from './types';
import { TodoList } from './components/TodoList';

export const App = () => {
  const initialTodos: Todo[] = todosFromServer.map(todo => ({
    ...todo,
    user: usersFromServer.find(user => user.id === todo.userId),
  }));

  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [users] = useState<User[]>(usersFromServer);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isTitleInvalid = !title.trim();
    const isUserInvalid = userId === 0;

    setTitleError(isTitleInvalid);
    setUserError(isUserInvalid);

    if (isTitleInvalid || isUserInvalid) {
      return;
    }

    const currentUser = users.find(user => user.id === userId);

    const newTodo: Todo = {
      // Виправлено іменування (todo замість t)
      id: todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1,
      title: title.trim(),
      userId: userId,
      completed: false,
      user: currentUser,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          {/* Додано Label для доступності */}
          <label htmlFor="todo-title">Title</label>
          <input
            id="todo-title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter title"
            value={title}
            // Виправлено: event замість e
            onChange={event => {
              setTitle(event.target.value);
              setTitleError(false);
            }}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="todo-user">User</label>
          <select
            id="todo-user"
            data-cy="userSelect"
            value={userId}
            onChange={event => {
              setUserId(Number(event.target.value));
              setUserError(false);
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {users.map(user => (
              <option value={user.id} key={user.id}>
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

      {/* Використовуємо окремий компонент (Декомпозиція) */}
      <TodoList todos={todos} />
    </div>
  );
};
