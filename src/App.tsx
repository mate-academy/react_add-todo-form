import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { User } from './components/types/User';
import { Todo } from './components/types/Todo';

const newTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId) || null,
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(newTodos);
  const [title, setTitle] = useState('');
  const [titleTouched, setTitleTouched] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [user, setUser] = useState('');
  const [userTouched, setUserTouched] = useState(false);
  const [userError, setUserError] = useState(false);
  const [users] = useState<User[]>(usersFromServer);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value.replace(/[^a-zA-Z0-9\s]/g, ''));
    if (event.target.value.trim() !== '') {
      setTitleError(false);
    }
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUserId = event.target.value;

    setUser(selectedUserId);
    if (selectedUserId !== '') {
      setUserError(false);
    }
  };

  const handleAddTodo = (event: React.FormEvent) => {
    event.preventDefault();
    setTitleTouched(true);
    setUserTouched(true);
    let isValid = true;

    if (!title.trim()) {
      setTitleError(true);
      isValid = false;
    }

    if (user === '') {
      setUserError(true);
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const newTodo: Todo = {
      id: Math.max(...todos.map(todo => todo.id), 0) + 1,
      title: title.trim(),
      userId: Number(user),
      completed: false,
      user: users.find(u => u.id === Number(user)) || null,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setUser('');
    setTitleTouched(false);
    setUserTouched(false);
    setTitleError(false);
    setUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleAddTodo}>
        <div className="field">
          <label htmlFor="titleInput">Title:</label>
          <input
            id="titleInput"
            type="text"
            data-cy="titleInput"
            placeholder="Enter title"
            value={title}
            onChange={handleTitleChange}
            onBlur={() => setTitleTouched(true)}
          />
          {titleError && titleTouched && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User:</label>
          <select
            id="userSelect"
            data-cy="userSelect"
            value={user}
            onChange={handleUserChange}
            onBlur={() => setUserTouched(true)}
          >
            <option value="" disabled>
              Choose a user
            </option>
            {users.map(userFromServer => (
              <option key={userFromServer.id} value={userFromServer.id}>
                {userFromServer.name}
              </option>
            ))}
          </select>
          {userError && userTouched && (
            <span className="error">Please choose a user</span>
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
