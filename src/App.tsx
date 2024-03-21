import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { TodoList } from './components/TodoList';
import { useState } from 'react';
import { Todo, User } from './types';

export function getUserById(userId: number): User {
  return usersFromServer.find(usr => usr.id === userId) as User;
}

export const preparedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

const getTodoId = (todos: Todo[]) => {
  return Math.max(...todos.map(todo => todo.id)) + 1;
};

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(preparedTodos);

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasSelectError, setHasSelectError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasSelectError(false);
  };

  const onAdd = (todo: Todo) => {
    const newTodo = { ...todo, id: getTodoId(todos) };

    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  const reset = () => {
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

    onAdd({
      id: 0,
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    });

    reset();
  };

  return (
    <div className="App">
      <h1 className="title">Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <div className="field">
          <input
            className="input"
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
          {hasTitleError && <p className="error">Please enter a title</p>}
        </div>

        <div className="field">
          <label className="label" htmlFor="user">
            User:
          </label>
          <div className="control">
            <div className="select">
              <select
                id="user"
                data-cy="userSelect"
                defaultValue="0"
                value={userId}
                onChange={handleSelectChange}
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
            </div>
          </div>

          {hasSelectError && <p className="error">Please choose a user</p>}
        </div>

        <button className="button is-info" type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
