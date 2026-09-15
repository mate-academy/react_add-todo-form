import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');

  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleTitleChange = e => {
    setTitle(e.target.value);
    setTitleError(false);
  };

  const handleUserChange = e => {
    setUserId(e.target.value);
    setUserError(false);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const isTitleEmpty = title.trim() === '';
    const isUserEmpty = userId === '';

    setTitleError(isTitleEmpty);
    setUserError(isUserEmpty);

    if (isTitleEmpty || isUserEmpty) {
      return;
    }

    const user = usersFromServer.find(
      currentUser => currentUser.id === Number(userId),
    );

    if (!user) {
      return;
    }

    const maxId = todos.reduce((max, todo) => Math.max(max, todo.id), 0);

    const newTodo = {
      id: maxId + 1,
      title: title.trim(),
      userId: user.id,
      completed: false,
      user,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);

    setTitle('');
    setUserId('');

    setTitleError(false);
    setUserError(false);
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
            onChange={handleTitleChange}
          />

          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
          >
            <option value="">Choose a user</option>

            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
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
