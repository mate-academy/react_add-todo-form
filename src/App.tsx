import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { Todo } from './types/Todo';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const todos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [newTodos, setNewTodos] = useState<Todo[]>(todos);

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasSelectError, setHasSelectError] = useState(false);

  function getNewIdForTodo(arrOfTodos: Todo[]) {
    const newId = Math.max(...arrOfTodos.map(todo => todo.id));

    return newId + 1;
  }

  const addTodo = (todo: Todo) => {
    setNewTodos(currentTodos => [...currentTodos, todo]);
  };

  const handleTitleSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserIdSubmit = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasSelectError(false);
  };

  const onReset = (): void => {
    setTitle('');
    setUserId(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasSelectError(!userId);

    if (!title || !userId) {
      return;
    }

    let titleWithoutSymbols = title;

    if (titleWithoutSymbols.match(/[^a-zA-Zа-яА-Я0-9\s]/g)) {
      titleWithoutSymbols = titleWithoutSymbols.replace(
        /[^a-zA-Zа-яА-Я0-9\s]/g,
        '',
      );
    }

    addTodo({
      id: getNewIdForTodo(newTodos),
      title: titleWithoutSymbols,
      completed: false,
      userId: userId,
      user: getUserById(userId),
    });

    onReset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label className="label" htmlFor="title">
            {'Title: '}
          </label>

          <input
            placeholder="Enter a title"
            id="title"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleSubmit}
          />

          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label className="label" htmlFor="user">
            {'User: '}
          </label>

          <select
            id="user"
            data-cy="userSelect"
            value={userId}
            onChange={handleUserIdSubmit}
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

          {hasSelectError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={newTodos} />
    </div>
  );
};
