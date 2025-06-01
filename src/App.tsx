import { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { getUserById } from './services/User';
import { Todo } from './types/Todo';
import usersFromServer from './api/users';

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function createId(todos: Todo[]): number {
  if (todos.length === 0) {
    return 1;
  }

  return Math.max(...todos.map(todo => todo.id)) + 1;
}

export const App = () => {
  const [title, setTitle] = useState('');
  const [user, setUser] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setHasTitleError(false);
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUser(+e.target.value);
    setHasUserError(false);
  };

  const [todosToShow, setTodosToShow] = useState<Todo[]>(initialTodos);

  const addTodo = (todo: Todo) => {
    const newTodo = {
      ...todo,
      id: createId(todosToShow),
    };

    setTodosToShow(currentTodos => [...currentTodos, newTodo]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setHasTitleError(!title);
    setHasUserError(!user);

    if (!title || !user) {
      return;
    }

    addTodo({
      id: 0,
      title,
      completed: false,
      userId: user,
      user: getUserById(user),
    });

    setTitle('');
    setUser(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label>
            Title:
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleTitleChange}
            />
          </label>
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            User:
            <select
              data-cy="userSelect"
              value={user}
              onChange={handleUserChange}
            >
              <option value="0" disabled>
                Choose a user
              </option>
              {usersFromServer.map(userFromServer => (
                <option value={userFromServer.id} key={userFromServer.id}>
                  {userFromServer.name}
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
      <TodoList todos={todosToShow} />

    </div>
  );
};
