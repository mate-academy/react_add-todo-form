import './App.scss';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { getUserById } from './services/getUserById';
import { useState } from 'react';
import { TodoWithUser } from './types';

const initialTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [selectedId, setSelectedId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasSelectError, setHasSelectError] = useState(false);
  const [todos, setTodos] = useState(initialTodos);

  const addTodo = (newTodo: TodoWithUser) => {
    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  const resetAll = () => {
    setTitle('');
    setSelectedId(0);
  };

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasSelectError(!selectedId);

    if (!title || !selectedId) {
      return;
    }

    const selectedUser = usersFromServer.find(user => user.id === selectedId);

    addTodo({
      id: Math.max(...todos.map(todo => todo.id), 0) + 1,
      title,
      completed: false,
      userId: selectedId,
      user: selectedUser,
    });

    resetAll();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleAdd}>
        <div className="field">
          <label htmlFor="titleInput" className="label">
            Title:{' '}
          </label>
          <input
            id="titleInput"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
          {hasTitleError && !title && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect" className="label">
            User:{' '}
          </label>
          <select
            id="userSelect"
            data-cy="userSelect"
            value={selectedId}
            onChange={event => setSelectedId(+event.target.value)}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {hasSelectError && !selectedId && (
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
