import { useState, FormEvent, ChangeEvent } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { User } from './types/User';

export const App = () => {
  const [users] = useState<User[]>(usersFromServer);
  const [todos, setTodos] = useState<Todo[]>(() => {
    return todosFromServer.map(todo => {
      const user = users.find(u => u.id === todo.userId);

      return {
        ...todo,
        user,
      };
    });
  });

  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number | ''>('');
  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    const sanitizedValue = value.replace(/[^a-zA-Zа-яА-ЯіІїЇєЄґҐ0-9\s]/g, '');

    setTitle(sanitizedValue);

    if (titleError) {
      setTitleError('');
    }
  };

  const handleUserChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(event.target.value ? Number(event.target.value) : '');

    if (userError) {
      setUserError('');
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    let isValid = true;

    if (!title.trim()) {
      setTitleError('Please enter a title');
      isValid = false;
    }

    if (!selectedUserId) {
      setUserError('Please choose a user');
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const selectedUser = users.find(user => user.id === selectedUserId);

    if (!selectedUser) {
      return;
    }

    const newId = Math.max(...todos.map(todo => todo.id)) + 1;

    const newTodo: Todo = {
      id: newId,
      title: title.trim(),
      completed: false,
      userId: selectedUser.id,
      user: selectedUser,
    };

    setTodos([...todos, newTodo]);

    setTitle('');
    setSelectedUserId('');
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
            <option value="" disabled>
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
