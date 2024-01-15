import { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

const getUserById = (userId: number) => {
  return usersFromServer.find((user) => user.id === userId);
};

const normalizedTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(normalizedTodos);
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');

  const handleAddTodo = () => {
    setTitleError('');
    setUserError('');

    if (!title.trim()) {
      setTitleError('Please enter a title');
    }

    if (!selectedUser) {
      setUserError('Please choose a user');
    }

    const user = getUserById(parseInt(selectedUser, 10));

    if (!user) {
      return;
    }

    if (title.trim() && selectedUser) {
      const newTodo = {
        user,
        id: todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1,
        title,
        userId: parseInt(selectedUser, 10),
        completed: false,
      };

      setTodos([...todos, newTodo]);

      setTitle('');
      setSelectedUser('');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setTitleError('');
            }}
            placeholder="Enter a title"
          />
          <span className="error">{titleError}</span>
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            data-cy="userSelect"
            value={selectedUser}
            onChange={(e) => {
              setSelectedUser(e.target.value);
              setUserError('');
            }}
            placeholder="Choose a user"
          >
            <option value="" disabled>Choose a user</option>
            {usersFromServer.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          <span className="error">{userError}</span>
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={handleAddTodo}
        >
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={todos} users={usersFromServer} />
      </section>
    </div>
  );
};
