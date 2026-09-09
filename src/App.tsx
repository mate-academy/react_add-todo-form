import './App.scss';

import { useState } from 'react';
import { ChangeEvent, FormEvent } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo, User } from './types';

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [showTitleError, setShowTitleError] = useState(false);
  const [showUserError, setShowUserError] = useState(false);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const sanitizedTitle = event.target.value.replace(
      /[^a-zA-Zа-яА-ЯёЁ0-9 ]/g,
      '',
    );

    setTitle(sanitizedTitle);
    setShowTitleError(false);
  };

  const handleUserChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(event.target.value);
    setShowUserError(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const hasTitle = title.trim().length > 0;
    const selectedUser = usersFromServer.find(
      user => user.id === Number(selectedUserId),
    );

    setShowTitleError(!hasTitle);
    setShowUserError(!selectedUser);

    if (!hasTitle || !selectedUser) {
      return;
    }

    const newTodo: Todo = {
      id: Math.max(...todos.map(todo => todo.id)) + 1,
      title,
      completed: false,
      userId: selectedUser.id,
      user: selectedUser,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setSelectedUserId('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
          {showTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">User</label>
          <select
            id="user"
            data-cy="userSelect"
            value={selectedUserId}
            onChange={handleUserChange}
          >
            <option value="">Choose a user</option>
            {usersFromServer.map((user: User) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {showUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
