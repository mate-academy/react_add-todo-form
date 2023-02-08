import { ChangeEvent, useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodosWithUser, User } from './types';
import { TodoList } from './components/TodoList';

const getUserById = (id: number): User | null => {
  const foundUser = usersFromServer.find(user => id === user.id);

  return foundUser || null;
};

const todosWithUser: TodosWithUser[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.id),
}));

export const App = () => {
  const [todos, setTodos] = useState<TodosWithUser[]>(todosWithUser);

  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState(0);

  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasSelectUserError, setHasSelectUserError] = useState(false);

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(+event.target.value);
    setHasSelectUserError(false);
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const resetForm = () => {
    setTitle('');
    setSelectedUser(0);
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    setHasSelectUserError(!selectedUser);
    setHasTitleError(!title);

    const largestId = Math.max(...todos.map(todo => todo.id));

    const newTodo = {
      id: largestId + 1,
      title,
      completed: false,
      userId: +selectedUser,
      user: getUserById(+selectedUser),
    };

    if (title && selectedUser) {
      setTodos(currentTodos => [...currentTodos, newTodo]);
      resetForm();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label>
            Title:
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              name="title"
              value={title}
              onChange={handleInput}
            />
          </label>

          {hasTitleError && (
            <span className="error">Please type title</span>
          )}
        </div>

        <div className="field">
          <label>
            User:
            <select
              data-cy="userSelect"
              name="user"
              value={selectedUser}
              onChange={handleSelect}
              placeholder="Choose a user"
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map((user) => (
                <option key={user.id} value={`${user.id}`}>{user.name}</option>
              ))}
            </select>
          </label>

          {hasSelectUserError && (
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
