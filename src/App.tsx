import './App.scss';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import { getUserById } from './services/user';
import { Todo } from './types/Todo';
import todosFromServer from './api/todos';
import { ChangeEvent, useState } from 'react';

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));
const maxId = todosFromServer.reduce((max, todo) => {
  return Math.max(todo.id, max);
}, todosFromServer[0].id);

export const App: React.FC = () => {
  const [id, setId] = useState(maxId);
  const [todos, setTodos] = useState(initialTodos);
  const onSubmit = (newTodo: Todo) => {
    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  const [userId, setUserId] = useState(0);
  const [hasUserError, setHasUserError] = useState(false);
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title.trim());
    setHasUserError(!userId);

    if (!title.trim() || !userId) {
      return;
    }

    onSubmit({
      id: id,
      title,
      userId,
      completed: false,
      user: getUserById(userId),
    });

    setTitle('');
    setUserId(0);
    setId(id + 1);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">
            Title
            <input
              type="text"
              data-cy="titleInput"
              id="title"
              value={title}
              onChange={handleTitleChange}
              placeholder="Enter a title"
            />
          </label>
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">
            User:
            <select
              id="userSelect"
              data-cy="userSelect"
              value={userId}
              onChange={handleUserChange}
            >
              <option value={0} disabled>
                {'Choose a user'}
              </option>
              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>
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
