import './App.scss';
import { FormEvent, useState } from 'react';

import { TodoList } from './components/TodoList';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

const initialTodos = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(currentUser => currentUser.id === todo.userId)!,
}));

export const App = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let hasError = false;

    if (!title.trim()) {
      setTitleError(true);
      hasError = true;
    }

    if (userId === 0) {
      setUserError(true);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const selectedUser = usersFromServer.find(
      currentUser => currentUser.id === userId,
    );

    if (!selectedUser) {
      return;
    }

    const newTodo = {
      id: Math.max(...todos.map(todo => todo.id)) + 1,
      title: title.trim(),
      completed: false,
      userId,
      user: selectedUser,
    };

    setTodos([...todos, newTodo]);

    setTitle('');
    setUserId(0);
    setTitleError(false);
    setUserError(false);
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
            placeholder="Enter a title"
            data-cy="titleInput"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setTitleError(false);
            }}
          />

          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User</label>

          <select
            id="user"
            data-cy="userSelect"
            value={userId}
            onChange={event => {
              setUserId(Number(event.target.value));
              setUserError(false);
            }}
          >
            <option value={0}>Choose a user</option>

            {usersFromServer.map(currentUser => (
              <option key={currentUser.id} value={currentUser.id}>
                {currentUser.name}
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
