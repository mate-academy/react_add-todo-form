import { ChangeEvent, FormEvent, useState } from 'react';
import './App.scss';
import { Todo } from './type/Todo';
import { User } from './type/User';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';

function getTodos(): Todo[] {
  return todosFromServer.map(todo => {
    const copy: Todo = {
      ...todo,
      user: usersFromServer.find(user => user.id === todo.userId) || null,
    };

    return copy;
  });
}

function getNextId(todos: Todo[]): number {
  return Math.max(...(todos.map(({ id }) => id))) + 1;
}

function getUserById(id: number): User | null {
  return usersFromServer.find(user => user.id === id) || null;
}

export const App = () => {
  const [todos, setTodos] = useState(getTodos());
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [submitError, setSubmitError] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!userId || !title) {
      setSubmitError(true);

      return;
    }

    if (submitError) {
      setSubmitError(false);
    }

    setTodos(previous => {
      const newTask: Todo = {
        id: getNextId(previous),
        completed: false,
        title,
        user: getUserById(userId),
      };

      return [...previous, newTask];
    });
    setTitle('');
    setUserId(0);
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setTitle(value);
  };

  const handleUserChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setUserId(Number(value));
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
          <label>
            Title:
            <input
              type="text"
              data-cy="titleInput"
              value={title}
              placeholder="title"
              onChange={handleTitleChange}
            />
          </label>
          {
            submitError
            && !title
            && <span className="error">Please enter a title</span>
          }
        </div>

        <div className="field">
          <label>
            User:
            <select
              data-cy="userSelect"
              onChange={handleUserChange}
              value={userId}
            >
              <option value="">Choose a user</option>

              {usersFromServer.map(({ name, id }) => (
                <option
                  key={id}
                  value={id}
                >
                  {name}
                </option>
              ))}
            </select>
          </label>

          {
            submitError
            && !userId
            && <span className="error">Please choose a user</span>
          }
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
