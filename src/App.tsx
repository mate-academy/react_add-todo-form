import './App.scss';
import { useState } from 'react';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import { Todo, User } from './types/Types';

function prepareTodos(todos: Omit<Todo, 'user'>[], users: User[]): Todo[] {
  return todos.map(todo => {
    const user = users.find(u => u.id === todo.userId);

    return {
      ...todo,
      completed: !!todo.completed,
      user: user!,
    };
  });
}

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(
    prepareTodos(todosFromServer, usersFromServer),
  );

  const [users] = useState(usersFromServer);

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');

  const clearTitleError = () => setTitleError('');
  const clearUserError = () => setUserError('');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (titleError) {
      clearTitleError();
    }
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+e.target.value);
    if (userError) {
      clearUserError();
    }
  };

  const validateForm = () => {
    let isValid = true;

    if (!title.trim()) {
      setTitleError('Please enter a title');
      isValid = false;
    }

    if (!userId) {
      setUserError('Please choose a user');
      isValid = false;
    }

    return isValid;
  };

  const createTodo = (): Todo => {
    return {
      id: Math.max(...todos.map(todo => todo.id)) + 1,
      title,
      completed: false,
      userId,
      user: users.find(user => user.id === userId)!,
    };
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newTodo = createTodo();

    setTodos(prev => [...prev, newTodo]);
    setTitle('');
    setUserId(0);
  };

  const renderTitleError = () =>
    titleError && <span className="error">{titleError}</span>;

  const renderUserError = () =>
    userError && <span className="error">{userError}</span>;

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter title"
            value={title}
            onChange={handleTitleChange}
          />
          {renderTitleError()}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
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
          {renderUserError()}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
