import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
  user: User | null;
}

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(() =>
    todosFromServer.map(todo => ({
      ...todo,
      user: usersFromServer.find(u => u.id === todo.userId) || null,
    })),
  );

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [titleError, setTitleError] = useState('');
  const [userIdError, setUserIdError] = useState('');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const filteredValue = value.replace(/[^a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ0-9 ]/g, '');

    setTitle(filteredValue);

    if (filteredValue.trim() !== '') {
      setTitleError('');
    }
  };

  const handleUserIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUserId = Number(e.target.value);

    setUserId(selectedUserId);

    if (selectedUserId !== 0) {
      setUserIdError('');
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let hasError = false;

    if (title.trim() === '') {
      setTitleError('Please enter a title');
      hasError = true;
    }

    if (userId === 0) {
      setUserIdError('Please choose a user');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const selectedUser = usersFromServer.find(u => u.id === userId) || null;
    const maxId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) : 0;

    const newTodo: Todo = {
      id: maxId + 1,
      title: title.trim(),
      userId,
      completed: false,
      user: selectedUser,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
    setTitle('');
    setUserId(0);
    setTitleError('');
    setUserIdError('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            data-cy="titleInput"
            placeholder="Enter todo title"
          />
          {titleError && <span className="error">{titleError}</span>}
        </div>

        <div className="field">
          <select
            value={userId}
            onChange={handleUserIdChange}
            data-cy="userSelect"
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userIdError && <span className="error">{userIdError}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
