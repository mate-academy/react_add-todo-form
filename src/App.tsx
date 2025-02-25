import { useState, ChangeEvent, FormEvent } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import './App.scss';
import { TodoList } from './components/TodoList';

// Define types directly in each file instead of importing
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
  user: User;
}

export const App = () => {
  // Мапимо todos з server та додаємо інформацію про користувача
  const todosWithUser = todosFromServer.map(todo => {
    const user = usersFromServer.find(u => u.id === todo.userId);

    return {
      ...todo,
      user: user || { id: 0, name: 'Unknown', username: '', email: '' }, // значення за замовчуванням
    };
  });

  const [todos, setTodos] = useState<Todo[]>(todosWithUser);
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('0');
  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Optional: filter title to allow only letters, digits, and spaces
    const filteredTitle = e.target.value.replace(
      /[^a-zA-Zа-яА-ЯіІїЇєЄґҐ0-9\s]/g,
      '',
    );

    setTitle(filteredTitle);
    setTitleError('');
  };

  const handleUserChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(e.target.value);
    setUserError('');
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let isValid = true;

    // Validate title
    if (!title.trim()) {
      setTitleError('Please enter a title');
      isValid = false;
    }

    // Validate user
    if (selectedUserId === '0') {
      setUserError('Please choose a user');
      isValid = false;
    }

    if (isValid) {
      // Find the largest id in the current todos
      const maxId = Math.max(...todos.map(todo => todo.id), 0);
      const selectedUser = usersFromServer.find(
        user => user.id === parseInt(selectedUserId),
      );

      if (selectedUser) {
        // Create new todo
        const newTodo: Todo = {
          id: maxId + 1,
          title: title.trim(),
          userId: parseInt(selectedUserId),
          completed: false,
          user: selectedUser,
        };

        // Add new todo to the list
        setTodos([...todos, newTodo]);

        // Clear the form
        setTitle('');
        setSelectedUserId('0');
      }
    }
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
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter todo title"
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
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id.toString()}>
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
