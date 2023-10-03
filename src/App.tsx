import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './components/types/Todo';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

const initialTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>([...initialTodos]);

  const [title, setTitle] = useState('');
  const [titleHasEror, setTitleHasEror] = useState(false);

  const [userIdHasError, setUserIdHasError] = useState(false);
  const [userId, setUserId] = useState(0);

  const titleChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleHasEror(false);
  };

  const selectUserIdHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserIdHasError(false);
  };

  const resetForm = () => {
    setTitle('');
    setUserId(0);

    setTitleHasEror(false);
    setUserIdHasError(false);
  };

  const generateId = () => Math.max(...todos.map(todo => todo.id)) + 1;

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    setTitleHasEror(!title);
    setUserIdHasError(!userId);

    if (!title || !userId) {
      return;
    }

    if (!titleHasEror && !userIdHasError) {
      const newTodo: Todo = {
        id: generateId(),
        title,
        userId,
        completed: false,
        user: getUserById(userId),
      };

      setTodos(prevTodos => [...prevTodos, newTodo]);
      resetForm();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={submitHandler}
      >
        <div className="field">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={titleChangeHandler}
          />

          {titleHasEror && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">User:</label>
          <select
            data-cy="userSelect"
            id="user"
            onChange={selectUserIdHandler}
            value={userId}
          >
            <option value={0} disabled>Choose a user</option>

            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userIdHasError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList
        todos={todos}
        // users={usersFromServer}
      />
    </div>
  );
};
