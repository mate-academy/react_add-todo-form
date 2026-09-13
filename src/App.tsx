import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

const newTodos = todosFromServer.map(todo => {
  const newUser = usersFromServer.find(user => user.id === todo.userId);

  if (!newUser) {
    throw new Error('User not found');
  }

  return { ...todo, user: newUser };
});

export const App = () => {
  const [todos, setTodos] = useState(newTodos);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!title) {
      setHasTitleError(true);
    }

    if (!selectedUserId) {
      setHasUserError(true);
    }

    if (!title || !selectedUserId) {
      return;
    }

    const largestId = Math.max(...todos.map(todo => todo.id));
    const newId = largestId + 1;
    const selectedUser = usersFromServer.find(
      user => user.id === selectedUserId,
    );

    if (!selectedUser) {
      return;
    }

    const newTodo = {
      id: newId,
      title: title,
      userId: selectedUserId,
      completed: false,
      user: selectedUser,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setSelectedUserId(null);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="todoTitle">Title:</label>
          <input
            id="todoTitle"
            type="text"
            data-cy="titleInput"
            onChange={event => {
              setTitle(event.target.value);
              setHasTitleError(false);
            }}
            value={title}
            placeholder="Enter a title"
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="todoUser">User:</label>
          <select
            id="todoUser"
            data-cy="userSelect"
            onChange={event => {
              setSelectedUserId(Number(event.target.value));
              setHasUserError(false);
            }}
            value={selectedUserId === null ? '' : selectedUserId}
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

          {hasUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
