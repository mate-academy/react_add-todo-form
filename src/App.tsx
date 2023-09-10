import './App.scss';

import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { TodoWithoutUser, TodoWithUser, User } from './types';

const preparedTodo: TodoWithUser[] = todosFromServer
  .map((todo: TodoWithoutUser) => {
    return {
      ...todo,
      user: usersFromServer
        .find((user: User) => user.id === todo.userId) || null,
    };
  });

export const App = () => {
  const [visibleTodos, setVisibleTodos]
  = useState<TodoWithUser[]>(preparedTodo);
  const [title, setTitle] = useState('');
  const [selecteUserId, setSelecteUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const resetForm = () => {
    setTitle('');
    setSelecteUserId(0);
    setTitleError(false);
    setUserError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTitleError(!title);
    setUserError(!selecteUserId);

    if (title && selecteUserId) {
      setVisibleTodos((prevTodos) => {
        const maxId: number = Math.max(...prevTodos.map(todo => todo.id));
        const newTodo = {
          id: maxId + 1,
          title,
          completed: false,
          userId: selecteUserId,
          user: usersFromServer.find(({ id }) => id === selecteUserId) || null,
        };

        return [...prevTodos, newTodo];
      });
      resetForm();
    }
  };

  const handleOnChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleOnChangeUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelecteUserId(+event.target.value);
    setUserError(false);
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
            onChange={handleOnChangeTitle}
          />
          {titleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selecteUserId}
            onChange={handleOnChangeUser}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userError && (
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
