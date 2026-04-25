import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { User } from './types/User';
import { ToDo } from './types/ToDo';
import { TodoList } from './components/TodoList';

function getUserById(userId: number): User | null {
  return usersFromServer.find(u => u.id === userId) ?? null;
}

const initialToDoList: ToDo[] = todosFromServer
  .map(todo => {
    const user = getUserById(todo.userId);

    if (!user) {
      return null;
    }

    return {
      ...todo,
      user,
    };
  })
  .filter((todo): todo is ToDo => todo !== null);

const isErrors = {
  title: false,
  user: false,
};

export const App = () => {
  const [todos, setTodos] = useState(initialToDoList);
  const [titleField, setTitleField] = useState('');
  const [userId, setUserId] = useState(0);
  const [errors, setErrors] = useState(isErrors);

  function getTodoId(): number {
    if (todos.length === 0) {
      return 1;
    }

    const arrOfId = todos.map(todo => todo.id);

    return Math.max(...arrOfId) + 1;
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleField(event.target.value);
    setErrors(prevErrors => ({ ...prevErrors, title: false }));
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setErrors(prevErrors => ({ ...prevErrors, user: false }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isNewErrors = {
      title: false,
      user: false,
    };

    if (!titleField) {
      isNewErrors.title = true;
    }

    if (userId === 0) {
      isNewErrors.user = true;
    }

    const user = getUserById(userId);

    if (!user) {
      isNewErrors.user = true;
    }

    setErrors(isNewErrors);

    if (Object.values(isNewErrors).some(value => value)) {
      return;
    }

    const newTodo = {
      id: getTodoId(),
      title: titleField,
      userId: userId,
      completed: false,
      user: user!,
    };

    const newTodos = [...todos, newTodo];

    setTodos(newTodos);
    setTitleField('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label className="label" htmlFor="title">
            {' '}
            Title:{' '}
          </label>
          <input
            id="title"
            type="text"
            placeholder="Enter a title"
            data-cy="titleInput"
            value={titleField}
            onChange={handleTitleChange}
          />
          {errors.title && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label className="label">
            User:
            <select
              data-cy="userSelect"
              value={userId}
              onChange={handleUserChange}
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
          </label>

          {errors.user && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
