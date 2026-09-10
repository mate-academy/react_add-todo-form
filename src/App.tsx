import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

function getNewTodoId(todos: Todo[]): number {
  return todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
}

export const App = () => {
  const todosWithUsers = todosFromServer.map(todo => ({
    ...todo,
    user: getUserById(todo.userId),
  }));

  const [todos, setTodos] = useState<Todo[]>(todosWithUsers);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  function reset() {
    setTitle('');
    setUserId(0);
    setHasTitleError(false);
    setHasUserError(false);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasTitleError(!title.trim());
    setHasUserError(!userId);

    if (!title.trim() || !userId) {
      return;
    }

    const newTodo: Todo = {
      id: getNewTodoId(todos),
      title: title.trim(),
      completed: false,
      userId,
      user: getUserById(userId),
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title</label>
          <input
            type="text"
            placeholder="Enter title"
            data-cy="titleInput"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setHasTitleError(false);
            }}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User</label>
          <select
            data-cy="userSelect"
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
