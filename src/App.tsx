import './App.scss';
import { TodoList } from './components/TodoList';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { useState } from 'react';

// import usersFromServer from './api/users';
// import todosFromServer from './api/todos';

export const App = () => {
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [isTitleError, setIsTitleError] = useState(false);
  const [isUserError, setIsUserError] = useState(false);
  const isFormValid = Boolean(title.trim()) && selectedUserId !== 0;
  const [todos, setTodos] = useState(() =>
    todosFromServer.map(todo => ({
      ...todo,
      user: usersFromServer.find(user => user.id === todo.userId)!,
    })),
  );

  function reset() {
    setSelectedUserId(0);
    setTitle('');
    setIsTitleError(false);
    setIsUserError(false);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isFormValid) {
      if (!title.trim()) {
        setIsTitleError(true);
      }

      if (selectedUserId === 0) {
        setIsUserError(true);
      }

      return;
    }

    const newTodo = {
      id: Math.max(0, ...todos.map(todo => todo.id)) + 1,
      title: title.trim(),
      completed: false,
      userId: selectedUserId,
      user: usersFromServer.find(user => user.id === selectedUserId)!,
    };

    setTodos(prev => [...prev, newTodo]);
    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setIsTitleError(false);
            }}
          />
          {isTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={event => {
              setSelectedUserId(Number(event.target.value));
              setIsUserError(false);
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {isUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
        <TodoList todos={todos} />
      </form>
    </div>
  );
};
