import React, { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodosWithUsers } from './react-app-env';
import { TodoList } from './components/TodoList';

const getUserById = (userId: number) => {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
};

const todosWithUsers: TodosWithUsers[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<TodosWithUsers[]>(todosWithUsers);
  const [newTitle, setNewTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [newUser, setNewUser] = useState(0);
  const [hasUserError, setHasUserError] = useState(false);

  const getNewTodoId = Math.max(...todos.map(todo => todo.id));

  const clearForm = () => {
    setNewTitle('');
    setNewUser(0);
  };

  const isRequired = () => {
    const trimedTitle = newTitle.trim();

    if (!trimedTitle || !newUser) {
      if (!trimedTitle) {
        setHasTitleError(true);
      }

      if (!newUser) {
        setHasUserError(true);
      }
    }

    return trimedTitle && newUser;
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNewUser(+event.target.value);
    setHasUserError(false);
  };

  const handleSubmit = (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isRequired()) {
      return;
    }

    const user = getUserById(newUser);

    const newTodo: TodosWithUsers = {
      id: getNewTodoId + 1,
      title: newTitle,
      completed: false,
      userId: newUser,
      user,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
    clearForm();
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
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={newTitle}
            onChange={handleTitle}
          />

          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">User</label>
          <select
            id="user"
            data-cy="userSelect"
            value={newUser}
            onChange={handleUser}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasUserError && (
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
