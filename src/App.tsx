import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { PreparedTodo, Todo } from './types/Todo';
import { User } from './types/User';

function getUser(users: User[], query: number): User | null {
  return users.find(user => user.id === query) || null;
}

function getPreparedTodos(todos: Todo[]): PreparedTodo[] {
  const copyTodos = [...todos];

  return copyTodos.map(todo => {
    const user = getUser(usersFromServer, todo.userId);

    return {
      ...todo,
      user,
    };
  });
}

function getNextTodoId(todos: Todo[]): number {
  const todoIds = todos.map(todo => todo.id);

  return Math.max(...todoIds) + 1;
}

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [showTitleError, setShowTitleError] = useState(false);
  const [showUserError, setShowUserError] = useState(false);
  const [allTodos, setAllTodos] = useState<Todo[]>(todosFromServer);
  const visibleTodos = getPreparedTodos(allTodos);

  function resetForm() {
    setTitle('');
    setUserId(0);
    setShowTitleError(false);
    setShowUserError(false);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const user = getUser(usersFromServer, userId);

    let hasError = false;

    if (title.trim() === '') {
      setShowTitleError(true);
      hasError = true;
    }

    if (!user) {
      setShowUserError(true);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const newTodo: Todo = {
      id: getNextTodoId(allTodos),
      title: title,
      userId: user!.id,
      completed: false,
    };

    setAllTodos(prevTodos => [...prevTodos, newTodo]);

    resetForm();
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="input">
            <span>Title: </span>
          </label>
          <input
            id="input"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            name="input"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setShowTitleError(false);
            }}
          />
          {showTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="select">
            <span>User: </span>
          </label>
          <select
            data-cy="userSelect"
            id="select"
            name="select"
            value={userId}
            onChange={event => {
              setUserId(Number(event.target.value));
              setShowUserError(false);
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
          {showUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={visibleTodos} />
    </div>
  );
};
