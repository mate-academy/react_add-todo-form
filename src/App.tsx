import { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const serverTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState(0);
  const [todos, setTodos] = useState(serverTodos);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const getNewId = () => (
    Math.max(
      ...todos.map(todo => todo.id),
    ) + 1
  );

  const addTodo = (array: Todo[]) => {
    if (selectedUser) {
      const newTodo: Todo = {
        id: getNewId(),
        userId: selectedUser,
        title,
        completed: false,
        user: getUser(selectedUser),
      };

      setTodos([...array, newTodo]);
    }
  };

  const clearForm = () => {
    setSelectedUser(0);
    setTitle('');
    setShowErrorMessage(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(+event.target.value);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title || !selectedUser) {
      setShowErrorMessage(true);

      return;
    }

    addTodo(todos);
    clearForm();
  };

  const titleErrorCondition = !title && showErrorMessage;
  const userErrorCondition = !selectedUser && showErrorMessage;

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
          {titleErrorCondition && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            id="user"
            data-cy="userSelect"
            value={selectedUser}
            onChange={handleUserChange}
          >
            <option value="0" disabled selected>Choose a user</option>

            {usersFromServer.map((user) => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userErrorCondition && (
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
