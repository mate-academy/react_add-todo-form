import './App.scss';

import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { TodoWithoutUser, TodoWithUser, User } from './types';

const findUserForTodo = (todo: TodoWithoutUser, users: User[]) => {
  return users.find((user: User) => user.id === todo.userId) || null;
};

const findUserById = (id:number, users:User[]) => {
  return users.find(({ id: userId }) => userId === id) || null;
};

const preparedTodos: TodoWithUser[] = todosFromServer
  .map((todo: TodoWithoutUser) => {
    return {
      ...todo,
      user: findUserForTodo(todo, usersFromServer),
    };
  });

export const App = () => {
  const [visibleTodos, setVisibleTodos]
  = useState<TodoWithUser[]>(preparedTodos);
  const [title, setTitle] = useState('');
  const [selecteUserId, setSelecteUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const resetForm = () => {
    setTitle('');
    setSelecteUserId(0);
    setHasTitleError(false);
    setHasUserError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title || !selecteUserId) {
      setHasTitleError(!title);
      setHasUserError(!selecteUserId);

      return;
    }

    setVisibleTodos((prevTodos) => {
      const maxId: number = Math.max(...prevTodos.map(todo => todo.id));
      const newTodo = {
        id: maxId + 1,
        title,
        completed: false,
        userId: selecteUserId,
        user: findUserById(selecteUserId, usersFromServer),
      };

      return [...prevTodos, newTodo];
    });

    resetForm();
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelecteUserId(+event.target.value);
    setHasUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selecteUserId}
            onChange={handleUserChange}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(({ id, name }) => (
              <option value={id} key={id}>
                {name}
              </option>
            ))}
          </select>

          {hasUserError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
