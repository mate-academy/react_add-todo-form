import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { TodoWithUser } from './api/types/types';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId);
}

export const App = () => {
  const [todos, setTodos] = useState<TodoWithUser[]>(
    todosFromServer.map(todo => ({
      ...todo,
      user: getUserById(todo.userId)!,
    })),
  );

  const [selectedUserId, setSelectedUserId] = useState(0);
  const [title, setTitle] = useState('');

  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const createTodo = (currentTitle: string, userId: number): TodoWithUser => {
    const user = getUserById(userId)!;
    const newId = Math.max(0, ...todos.map(todo => todo.id)) + 1;

    return {
      id: newId,
      title: currentTitle.trim(),
      completed: false,
      userId,
      user,
    };
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isTitleValid = !!title.trim();
    const isUserValid = selectedUserId !== 0;

    setHasTitleError(!isTitleValid);
    setHasUserError(!isUserValid);

    if (!isTitleValid || !isUserValid) {
      return;
    }

    setTodos(currentTodos => [
      ...currentTodos,
      createTodo(title, selectedUserId),
    ]);
    setTitle('');
    setSelectedUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            data-cy="titleInput"
            id="title"
            value={title}
            placeholder="Enter todo title"
            onChange={e => {
              setTitle(e.target.value);
              setHasTitleError(false);
            }}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User</label>
          <select
            data-cy="userSelect"
            id="userSelect"
            value={selectedUserId}
            onChange={e => {
              setSelectedUserId(Number(e.target.value));
              setHasUserError(false);
            }}
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
