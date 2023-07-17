import { ChangeEvent, useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import { creatTodoId } from './utils/helpers';
import { ToDo } from './types/types';
import { getUserById, visibleTodos } from './utils/utils';

export const App = () => {
  const [todos, setTodos] = useState<ToDo[]>(visibleTodos);
  const [title, setTitle] = useState<string>('');
  const [completed, setCompleted] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>(0);
  const [isUserError, setIsUserError] = useState<boolean>(false);
  const [isTitleError, setIsTitleError] = useState<boolean>(false);

  function handleSetUserId(event: ChangeEvent<HTMLSelectElement>) {
    setUserId(+event.target.value);
    setIsUserError(false);
  }

  function handleSetTitle(event: ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
    setIsTitleError(false);
  }

  function handleAdd(newTodo: ToDo) {
    setTodos(prevState => [...prevState, newTodo]);
  }

  const reset = () => {
    setTitle('');
    setCompleted(false);
    setUserId(0);
    setIsUserError(false);
    setIsTitleError(false);
  };

  function addToDo(event: React.FormEvent) {
    event.preventDefault();

    if (!title || !userId) {
      setIsTitleError(!title);
      setIsUserError(!userId);

      return;
    }

    handleAdd({
      id: creatTodoId(todos),
      title,
      completed,
      userId,
      user: getUserById(userId),
    });

    reset();
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={addToDo}>
        <div className="field">
          <label htmlFor="titleInput">Title: </label>

          <input
            type="text"
            data-cy="titleInput"
            id="titleInput"
            placeholder="Please enter a title"
            value={title}
            onChange={handleSetTitle}
          />

          {isTitleError && (
            <span className="error">
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User:</label>

          <select
            id="userSelect"
            data-cy="userSelect"
            value={userId}
            onChange={handleSetUserId}
          >

            <option value="0">Choose a user</option>
            {usersFromServer.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {isUserError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
