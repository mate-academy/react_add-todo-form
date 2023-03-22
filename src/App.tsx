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

function getUserByName(fullName: string): User | null {
  return usersFromServer.find(user => user.name === fullName) || null;
}

export const App = () => {
  const [todos, setTodos] = useState(getTodos());
  const [title, setTitle] = useState('');
  const [fullName, setFullName] = useState('');
  const [submitError, setSubmitError] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!fullName || !title) {
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
        user: getUserByName(fullName),
      };

      return [...previous, newTask];
    });
    setTitle('');
    setFullName('');
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setTitle(value);
  };

  const handleChangeUser = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setFullName(value);
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
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder="title"
            onChange={handleTitleChange}
          />
          {
            submitError
            && !title
            && <span className="error">Please enter a title</span>
          }
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            onChange={handleChangeUser}
            value={fullName}
          >
            <option value="">Choose a user</option>

            {usersFromServer.map(user => (
              <option
                key={user.id}
                value={user.name}
              >
                {user.name}
              </option>
            ))}
          </select>

          {
            submitError
            && !fullName
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
