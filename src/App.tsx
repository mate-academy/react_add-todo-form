import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('0');

  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isTitleEmpty = title.trim() === '';
    const isUserNotSelected = selectedUserId === '0';

    setHasTitleError(isTitleEmpty);
    setHasUserError(isUserNotSelected);

    if (isTitleEmpty || isUserNotSelected) {
      return;
    }

    const maxId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) : 0;
    const selectedUser = usersFromServer.find(
      u => u.id === Number(selectedUserId),
    );

    if (!selectedUser) {
      return;
    }

    const newTodo = {
      id: maxId + 1,
      title: title.trim(),
      userId: Number(selectedUserId),
      completed: false,
      user: selectedUser,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setSelectedUserId('0');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>
            Title:
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={e => {
                setTitle(e.target.value);
                setHasTitleError(false);
              }}
            />
          </label>
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            User:
            <select
              data-cy="userSelect"
              value={selectedUserId}
              onChange={e => {
                setSelectedUserId(e.target.value);
                setHasUserError(false);
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
          </label>
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
