import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { useState } from 'react';
import { TodoList } from './components/TodoList/TodoList';

export const App = () => {
  const preparedTodos = todosFromServer.map(todoServer => ({
    ...todoServer,
    user: usersFromServer.find(user => user.id === todoServer.userId) || null,
  }));

  const [todos, setTodos] = useState(preparedTodos);
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState('');

  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleAddTodo = event => {
    event.preventDefault();

    setTitleError(false);
    setUserError(false);

    let hasError = false;

    if (!title.trim()) {
      setTitleError(true);
      hasError = true;
    }

    if (!selectedUser) {
      setUserError(true);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const userObj = usersFromServer.find(u => u.id === Number(selectedUser));

    const maxId = todos.reduce((max, todo) => Math.max(max, todo.id), 0);

    const newTodo = {
      id: maxId + 1,
      title: title.trim(),
      completed: false,
      userId: userObj.id,
      user: userObj,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setSelectedUser('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleAddTodo}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              if (titleError) {
                setTitleError(false);
              }
            }}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUser}
            onChange={event => {
              setSelectedUser(event.target.value);
              if (userError) {
                setUserError(false);
              }
            }}
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
