import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { useState } from 'react';


export const App = () => {
  const [users] = useState<User[]>(usersFromServer);

  // Convert todos from server to include user objects
  const [todos, setTodos] = useState<Todo[]>(() =>
    todosFromServer.map(todo => ({
      ...todo,
      user: usersFromServer.find(user => user.id === todo.userId)!,
    })),
  );

  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number | ''>('');
  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');

  const getNextId = (): number => {
    return Math.max(...todos.map(todo => todo.id)) + 1;
  };

  const validateForm = (): boolean => {
    let isValid = true;

    // Reset errors
    setTitleError('');
    setUserError('');

    // Validate title
    if (!title.trim()) {
      setTitleError('Please enter a title');
      isValid = false;
    }

    // Validate user selection
    if (!selectedUserId) {
      setUserError('Please choose a user');
      isValid = false;
    }

    return isValid;
  };

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission

    if (!validateForm()) {
      return;
    }

    const selectedUser = users.find(user => user.id === selectedUserId);

    if (!selectedUser) {
      return;
    }

    const newTodo: Todo = {
      id: getNextId(),
      title: title.trim(),
      userId: selectedUserId as number,
      completed: false,
      user: selectedUser,
    };

    setTodos([...todos, newTodo]);

    // Clear form
    setTitle('');
    setSelectedUserId('');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    // Optional: Allow only letters (ua and en), digits, and spaces
    const filteredValue = e.target.value.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '');

    setTitle(filteredValue);

    // Hide error message on change
    if (titleError) {
      setTitleError('');
    }
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const value = e.target.value;

    setSelectedUserId(value ? Number(value) : '');

    // Hide error message on change
    if (userError) {
      setUserError('');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleAddTodo}>
        <div className="field">
          <label htmlFor="textInput">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            name="textInput"
            value={title}
            placeholder="Enter a title"
            onChange={handleTitleChange}
          />
          {titleError && <span className="error">{titleError}</span>}
        </div>

        <div className="field">
          <label htmlFor="textInput">User: </label>
          <select
            data-cy="userSelect"
            name="userSelect"
            value={selectedUserId || ''}
            onChange={handleUserChange}
          >
            <option value="" disabled selected>
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
