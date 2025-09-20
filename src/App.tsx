import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './components/types/Todo';
import { TodoList } from './components/TodoList/TodoList';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newTitle = event.target.value;

    newTitle = newTitle.replace(/[^a-zA-Zа-яА-ЯіІїЇєЄ0-9\s]/g, '');

    setTitle(newTitle);

    if (titleError) {
      setTitleError('');
    }
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newUserId = Number(event.target.value);

    setUserId(newUserId);

    if (userError) {
      setUserError('');
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    let isValid = true;

    if (!title.trim()) {
      setTitleError('Please enter a title');
      isValid = false;
    }

    if (!userId) {
      setUserError('Please choose a user');
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const selectedUser = usersFromServer.find(user => user.id === userId);

    if (!selectedUser) {
      return;
    }

    const newId = Math.max(0, ...todos.map(todo => todo.id)) + 1;

    const newTodo: Todo = {
      id: newId,
      title: title.trim(),
      userId,
      completed: false,
      user: selectedUser,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);

    setTitle('');
    setUserId(0);
    setTitleError('');
    setUserError('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          {/* Додано label для title input */}
          <label htmlFor="title-input" className="label">
            Title
          </label>
          <input
            id="title-input"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter todo title"
          />
          {titleError && (
            <span className="error" data-cy="errorMessage">
              {titleError}
            </span>
          )}
        </div>

        <div className="field">
          {/* Додано label для user select */}
          <label htmlFor="user-select" className="label">
            User
          </label>
          <select
            id="user-select"
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

          {userError && (
            <span className="error" data-cy="errorMessage">
              {userError}
            </span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
