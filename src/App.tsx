import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

const todosWithUsers: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosWithUsers);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setHasTitleError(!title.trim());
    setHasUserError(userId === 0);

    if (!title.trim() || userId === 0) {
      return;
    }

    const newId = Math.max(...todos.map(todo => todo.id)) + 1;
    const newTodo: Todo = {
      id: newId,
      title: title.trim(),
      completed: false,
      userId,
      user: getUserById(userId),
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setUserId(0);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title:</label>
          <input
            type="text"
            id="titleInput"
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
          <label htmlFor="userSelect">User:</label>
          <select
            data-cy="userSelect"
            id="userSelect"
            value={userId}
            onChange={event => {
              setUserId(Number(event.target.value));
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
