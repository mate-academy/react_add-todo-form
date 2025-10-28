import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/types';

export const App = () => {
  const preparedTodos: Todo[] = todosFromServer.map(todo => ({
    ...todo,
    user: usersFromServer.find(user => user.id === todo.userId)!,
  }));

  const [todos, setTodos] = useState<Todo[]>(preparedTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let valid = true;

    if (!title.trim()) {
      setTitleError('Please enter a title');
      valid = false;
    }

    if (!userId) {
      setUserError('Please choose a user');
      valid = false;
    }

    if (!valid) {
      return;
    }

    const nextId = Math.max(0, ...todos.map(todo => todo.id)) + 1;

    const selectedUser = usersFromServer.find(
      user => user.id === Number(userId),
    );

    if (!selectedUser) {
      return;
    }

    const newTodo = {
      id: nextId,
      title,
      userId: Number(userId),
      completed: false,
      user: selectedUser,
    };

    setTodos([...todos, newTodo]);

    setTitle('');
    setUserId('');
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);

    if (titleError) {
      setTitleError('');
    }
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(event.target.value);

    if (userError) {
      setUserError('');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            placeholder="Enter todo title"
            data-cy="titleInput"
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
            value={userId}
            onChange={handleUserChange}
          >
            <option value="" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
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
