import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { Todo, User } from './types/types';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const [users] = useState<User[]>(usersFromServer);

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    let hasError = false;

    if (!title.trim()) {
      setTitleError(true);
      hasError = true;
    }

    if (!userId) {
      setUserError(true);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const newId = Math.max(...todos.map(todo => todo.id)) + 1;

    const newTodo = {
      id: newId,
      title,
      userId,
      completed: false,
    };

    setTodos(todos.concat(newTodo));

    setTitle('');
    setUserId(0);

    setTitleError(false);
    setUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title: </label>
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
          <label htmlFor="user">User: </label>
          <select
            id="user"
            data-cy="userSelect"
            value={userId}
            onChange={changeEvent => {
              setUserId(+changeEvent.target.value);
              setUserError(false);
            }}
          >
            <option value={0} disabled>
              Choose a user
            </option>
            {users.map(user => (
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

      <TodoList todos={todos} users={users} />
    </div>
  );
};
