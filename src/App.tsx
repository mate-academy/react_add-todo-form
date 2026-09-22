import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { useState } from 'react';

const initialTodos = todosFromServer.map(todo => {
  const user = usersFromServer.find(
    currentUser => currentUser.id === todo.userId,
  );

  if (!user) {
    throw new Error('User not found');
  }

  return {
    ...todo,
    user: user,
  };
});

export const App = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const titleError = !title.trim();
  const userError = userId === 0;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasTitleError(titleError);
    setHasUserError(userError);

    if (titleError || userError) {
      return;
    }

    const selectedUser = usersFromServer.find(user => user.id === userId);

    if (!selectedUser) {
      return;
    }

    const newId = Math.max(...todos.map(todo => todo.id)) + 1;
    const newTodo = {
      id: newId,
      title: title,
      userId: userId,
      completed: false,
      user: selectedUser,
    };

    setTodos([...todos, newTodo]);

    setTitle('');
    setUserId(0);
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
            onChange={event => {
              setTitle(event.target.value);
              setHasTitleError(false);
            }}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User</label>
          <select
            id="user"
            data-cy="userSelect"
            value={userId}
            onChange={event => {
              setUserId(+event.target.value);
              setHasUserError(false);
            }}
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
