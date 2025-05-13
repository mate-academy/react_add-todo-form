import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const users = usersFromServer;

  const handleAddTodo = (event: React.FormEvent) => {
    event.preventDefault();

    if (title.trim() === '') {
      setTitleError(true);
    }

    if (selectedUserId === 0) {
      setUserError(true);
    }

    if (title.trim() === '' || selectedUserId === 0) {
      return;
    }

    setTodos((prevTodos) => [
      ...prevTodos,
      {
        id: Math.max(0, ...prevTodos.map((todo) => todo.id)) + 1,
        title: title,
        userId: selectedUserId,
        completed: false,
      },
    ]);

    setTitleError(false);
    setUserError(false);
    setSelectedUserId(0);
    setTitle('');
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(Number(event.target.value));
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleAddTodo}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setTitleError(false);
            }}
            placeholder="Enter todo title"
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={(event) => {
              handleChange(event);
              setUserError(false);
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
