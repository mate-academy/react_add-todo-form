import { useState } from 'react';
import { Todo } from './services/types';
import { PreparedTodo } from './services/types';
import { TodoList } from './components/TodoList';
import { userSearcher } from './services/helpers';
import { generateId } from './services/helpers';

import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const todos: Todo[] = todosFromServer;

const preparedTodo: PreparedTodo[] = todos.map(todo => ({
  id: todo.id,
  title: todo.title,
  completed: todo.completed,
  user: userSearcher(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [hasTitleError, setHasTitleError] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>(0);
  const [hasUserIdError, setHasUserIdError] = useState<boolean>(false);
  const [deals, setDeals] = useState(preparedTodo);

  const addTodo = (newTodo: PreparedTodo) => {
    setDeals(currentTodos => [...currentTodos, newTodo]);
  };

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
    const user = userSearcher(userId);

    setHasTitleError(!title);
    setHasUserIdError(!userId);
    if (!title || !userId) {
      return;
    }

    const newTodo: PreparedTodo = {
      id: generateId(deals),
      title,
      completed: false,
      user,
    };

    addTodo(newTodo);

    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          Title:&nbsp;
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          User:&nbsp;
          <select
            data-cy="userSelect"
            required
            value={userId}
            onChange={handleUserIdChange}
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
          {hasUserIdError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={deals} />
    </div>
  );
};
