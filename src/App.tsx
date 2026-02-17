import './App.scss';
import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServerRaw from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types';

// Подготавливаем начальные данные, обогащая их объектами пользователей
const initialTodos: Todo[] = todosFromServerRaw.map(todo => ({
  ...todo,
  user: usersFromServer.find(u => u.id === todo.userId)!,
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);

  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const cleanTitle = title.replace(/[^a-zA-Zа-яА-ЯёЁ0-9\s]/g, '').trim();

    let hasError = false;

    if (!cleanTitle) {
      setTitleError(true);
      hasError = true;
    }

    if (selectedUserId === 0) {
      setUserError(true);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const nextId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;

    const selectedUser = usersFromServer.find(
      user => user.id === selectedUserId,
    );

    const newTodo: Todo = {
      id: nextId,
      title: cleanTitle,
      completed: false,
      userId: selectedUserId,
      user: selectedUser!,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
    setTitle('');
    setSelectedUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="todo-title">Title</label>
          <input
            id="todo-title"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setTitleError(false);
            }}
            placeholder="Enter a title"
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user-select">User</label>
          <select
            id="user-select"
            data-cy="userSelect"
            value={selectedUserId}
            onChange={event => {
              setSelectedUserId(+event.target.value);
              setUserError(false);
            }}
          >
            <option value="0">Choose a user</option>
            {usersFromServer.map(user => (
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
