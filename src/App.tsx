import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const getUser = (userId: number) => {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
};

export const getTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [user, setUser] = useState(0);
  const [userError, setUserError] = useState(false);
  const [todos, setTodos] = useState(getTodos);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTodoId = Math.max(...todos.map(todo => todo.id)) + 1;

    if (!user) {
      setUserError(true);
    }

    if (!title) {
      setTitleError(true);
    }

    if (!title || !user) {
      return;
    }

    const newTodo = {
      id: newTodoId,
      completed: false,
      user: getUser(Number(user)),
      title: title.trim(),
      userId: Number(user),
    };

    setTodos([...todos, newTodo]);

    setUser(0);
    setTitle('');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    if (name === 'title') {
      setTitle(value);
      setTitleError(false);
    } else {
      setUser(+value);
      setUserError(false);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="titleInput">
            Title:
          </label>
          <input
            type="text"
            name="title"
            id="title"
            data-cy="titleInput"
            placeholder="Title"
            value={title}
            onChange={handleChange}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User:</label>
          <select
            data-cy="userSelect"
            name="user"
            id="user"
            value={user}
            onChange={handleChange}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map((userSelect) => (
              <option key={userSelect.id} value={userSelect.id}>
                {userSelect.name}
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
