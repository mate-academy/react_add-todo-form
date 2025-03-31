import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { User } from './types/User';

const todosList = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId) || null,
}));

function getSelectedUser(id: number): User | undefined {
  return usersFromServer.find(user => user.id === id);
}

export const App = () => {
  const [todos, setTodos] = useState(todosList);

  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);

  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedUserError, setSelectedUserError] = useState(false);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleError(false);
    setTitle(event.target.value);
  };

  const handleSelectedUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
    setSelectedUserError(false);
  };

  const validateForm = () => {
    const isTitleValid = title.trim() !== '';
    const isUserValid = selectedUserId !== 0;

    setTitleError(!isTitleValid);
    setSelectedUserError(!isUserValid);

    return isTitleValid && isUserValid;
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validateForm()) {
      const newsTodo = {
        id: Math.max(...todos.map(todo => todo.id)) + 1,
        title,
        completed: false,
        userId: selectedUserId,
        user: getSelectedUser(selectedUserId) || null,
      };

      setTodos([...todos, newsTodo]);
      setTitle('');
      setSelectedUserId(0);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={onSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Type title..."
            onChange={handleTitle}
            value={title}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={handleSelectedUser}
          >
            <option value={0} disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {selectedUserError && (
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
