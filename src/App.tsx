import { useState } from 'react';

import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoWithUser } from './react-app-env';
import { TodoList } from './components/TodoList';

const getUserById = (userId: number) => {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
};

const todosWithUsers: TodoWithUser[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<TodoWithUser[]>(todosWithUsers);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const generateTodoId = () => {
    const todoIds = todos.map(todo => todo.id);

    return Math.max(...todoIds) + 1;
  };

  const resetForm = () => {
    setNewTodoTitle('');
    setSelectedUserId(0);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!newTodoTitle);
    setHasUserError(!selectedUserId);

    const user = getUserById(selectedUserId);

    const newTodo: TodoWithUser = {
      id: generateTodoId(),
      title: newTodoTitle,
      userId: selectedUserId,
      completed: false,
      user,
    };

    if (newTodoTitle.trim() && selectedUserId) {
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
        onSubmit={handleFormSubmit}
      >
        <div className="field">
          <input
            type="text"
            placeholder="Enter a title"
            value={newTodoTitle}
            onChange={event => {
              setNewTodoTitle(event.target.value);
            }}
            data-cy="titleInput"
          />

          {!newTodoTitle.trim() && hasTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            value={selectedUserId}
            onChange={event => {
              setSelectedUserId(+event.target.value);
            }}
            data-cy="userSelect"
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {!selectedUserId && hasUserError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
