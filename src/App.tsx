import { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo, TodoList } from './components/TodoList';
import { v4 as uuidv4 } from 'uuid';

const enrichedTodos = todosFromServer.map(todo => ({
  ...todo,
  id: uuidv4(), // Gerando um ID único com UUID
  user: usersFromServer.find(user => user.id === todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(enrichedTodos);
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      setHasTitleError(true);
    }

    if (!userId) {
      setHasUserIdError(true);
    }

    if (!title.trim() || !userId) {
      return;
    }

    const newTodo: Todo = {
      id: uuidv4(), // Gerando o id único com UUID (mantendo o tipo como string)
      title,
      completed: false,
      userId,
      user: usersFromServer.find(user => user.id === userId),
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
          <label className="label" htmlFor="post-title">
            Title:
          </label>
          <input
            id="post-title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label className="label" htmlFor="post-user-id">
            User:
          </label>
          <select
            id="post-user-id"
            data-cy="userSelect"
            value={userId}
            onChange={handleUserIdChange}
          >
            <option value={0} disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {hasUserIdError && (
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
