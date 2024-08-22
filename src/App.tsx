import { useState } from 'react';
import './App.scss';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import { getUserById } from './services/user';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setHasTitleError(false);
  };

  const handleUserIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+e.target.value);
    setHasUserError(false);
  };

  const onAdd = (newTodo: Todo) => {
    setTodos(currentTodo => [...currentTodo, newTodo]);
  };

  const reset = () => {
    setTitle('');
    setUserId(0);
  };

  const newId = todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserError(!userId);

    if (!title || !userId) {
      return;
    }

    const newTodo: Todo = {
      id: newId,
      title: title.trim(),
      completed: false,
      userId: userId,
      user: getUserById(userId),
    };

    if (newTodo.id && newTodo.title && newTodo.userId && newTodo.user) {
      onAdd(newTodo);
    }

    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            id="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            data-cy="userSelect"
            id="userSelect"
            value={userId}
            onChange={handleUserIdChange}
          >
            <option value="0" disabled>
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
