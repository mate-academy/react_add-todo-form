import './App.scss';
import { useState, useEffect } from 'react';
import { TodoList } from './components/TodoList/TodoList';

import { Todo } from './types/Todo';
import { User } from './types/User';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(
    user => user.id === userId,
  );

  return foundUser || null;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasTitleError, setTitleError] = useState(false);
  const [hasUserError, setUserError] = useState(false);

  useEffect(() => {
    const initialTodos = todosFromServer.map(todo => ({
      ...todo,
      user: getUser(todo.userId),
    }));

    setTodos(initialTodos);
  }, []);

  function addTodo(newTitle: string, newUserId: number): void {
    const getMaxId = Math.max(...todos.map(todo => todo.id));
    const newTodo: Todo = {
      id: getMaxId + 1,
      title: newTitle,
      userId: newUserId,
      completed: false,
      user: getUser(userId),
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  }

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setTitleError(!title);
    setUserError(!userId);

    if (!title || !userId) {
      return;
    }

    addTodo(title, userId);
    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={onSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter todo title"
            value={title}
            onChange={(event) => {
              setTitleError(false);
              setTitle(event.target.value);
            }}
          />

          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={(event) => {
              setUserError(false);
              setUserId(+event.target.value);
            }}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={userId}>
                {user.name}
              </option>
            ))}
          </select>

          {hasUserError && (
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
