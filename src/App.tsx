import './App.scss';
import { ChangeEvent, FormEvent, useState } from 'react';

import { Todo } from './types/Todo';
import { User } from './types/User';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUserById(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const serverTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(serverTodos);
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const resetForm = () => {
    setUserId(0);
    setTitle('');
    setHasTitleError(false);
    setHasUserError(false);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!title) {
      setHasTitleError(true);
    }

    if (!userId) {
      setHasUserError(true);
    }

    if (title && userId) {
      const newTodoId = Math.max(...serverTodos.map(todo => todo.id)) + 1;

      const addTodo: Todo = {
        id: newTodoId,
        title,
        completed: false,
        userId: +userId,
        user: getUserById(userId),
      };

      setTodos([...todos, addTodo]);
      resetForm();
    }
  };

  const handleHasErrorTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);

    if (hasTitleError) {
      setHasTitleError(false);
    }
  };

  const handleHasErrorUser = (event: ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    if (hasUserError) {
      setHasUserError(false);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleHasErrorTitle}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            id="userSelect"
            data-cy="userSelect"
            name="user"
            value={userId}
            onChange={handleHasErrorUser}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => {
              const { id, name } = user;

              return (
                <option value={id} key={id}>
                  {name}
                </option>
              );
            })}
          </select>
          {hasUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={todos} />
      </section>
    </div>
  );
};
