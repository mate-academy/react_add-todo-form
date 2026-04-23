import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { useState } from 'react';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(
    todosFromServer.map(todo => ({
      ...todo,
      user: getUserById(todo.userId),
    })),
  );

  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [user, setUser] = useState(0);
  const [userError, setUserError] = useState(false);

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const validTitle = event.target.value.replace(
      /[^a-zA-Zа-яА-ЯіІїЇєЄґҐ0-9 ]/g,
      '',
    );

    setTitle(validTitle);
    setTitleError(false);
  }

  function handleUserChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setUser(+event.target.value);
    setUserError(false);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let hasError = false;

    if (title.trim().length === 0) {
      setTitleError(true);
      hasError = true;
    }

    if (user === 0) {
      setUserError(true);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const newId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;
    const newTodo: Todo = {
      id: newId,
      title: title.trim(),
      userId: user,
      completed: false,
      user: getUserById(user),
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setUser(0);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title-input">Title</label>
          <input
            type="text"
            id="title-input"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
            onBlur={() => setTitleError(!title)}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user-select">User</label>
          <select
            id="user-select"
            data-cy="userSelect"
            value={user}
            onChange={handleUserChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(u => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          disabled={titleError && userError}
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
