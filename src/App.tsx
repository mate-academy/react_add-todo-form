import { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { getUserById } from './services/getUserById';

// type Props = {
//   onSubmit: (todo: Todo) => void;
// }

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [userIdError, setUserIdError] = useState(false);

  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const addTodo = (newTodo: Todo) => {
    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const allowedCharacters = /[^A-Za-zА-Яа-яЇїІіЄє0-9 ]/g;
    const newValue = event.target.value.replace(allowedCharacters, '');

    setTitle(newValue);
    setTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setTitleError(!title);
    setUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    const maxId = Math.max(...todos.map(todo => todo.id));

    const newTodo = {
      id: maxId + 1,
      title,
      completed: false,
      userId,
      user: getUserById(userId),
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
          <label htmlFor="post-title">Title: </label>
          <input
            id="post-title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={event => {
              handleTitleChange(event);
            }}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="post-user">User: </label>

          <select
            id="post-user"
            data-cy="userSelect"
            value={userId}
            onChange={event => {
              handleUserIdChange(event);
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id} disabled={user.id === 0}>
                {user.name}
              </option>
            ))}
          </select>
          {userIdError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
