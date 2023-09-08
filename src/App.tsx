import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoWithUser } from './types/Todo';
import { TodoList } from './components/TodoList';

export const initialTodos = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(({ id }) => id === todo.userId) || null,
}));

export const App = () => {
  const [todoTitle, setTodoTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [userSelectId, setUserSelectId] = useState(0);
  const [hasUserSelectedId, setHasUserSelectedId] = useState(false);
  const [preparedTodos, setPreparedTodos] = useState(initialTodos);

  function getUserById(userId: number) {
    return usersFromServer.find(({ id }) => id === userId) || null;
  }

  function onSubmit(todo: TodoWithUser) {
    setPreparedTodos(currentTodo => [...currentTodo, todo]);
  }

  function formReset() {
    setTodoTitle('');
    setUserSelectId(0);
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTodoTitle(event.target.value);
    setHasTitleError(false);
  }

  function handleUserSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    setUserSelectId(+event.target.value);
    setHasUserSelectedId(false);
  }

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!todoTitle || !userSelectId) {
      setHasTitleError(Boolean(!todoTitle));
      setHasUserSelectedId(Boolean(!userSelectId));

      return;
    }

    const todoIds = preparedTodos.map(({ id }) => id);
    const maxTodoId = Math.max(...todoIds) + 1;

    onSubmit({
      id: maxTodoId,
      title: todoTitle,
      completed: false,
      userId: userSelectId,
      user: getUserById(userSelectId),
    });

    formReset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleOnSubmit}
      >
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            id="titleInput"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={todoTitle}
            onChange={handleInputChange}
          />
          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            data-cy="userSelect"
            id="userSelect"
            defaultValue={0}
            value={userSelectId}
            onChange={handleUserSelect}
            required
          >
            <option value="0">
              Choose a user
            </option>
            {usersFromServer.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
          {hasUserSelectedId && (
            <span className="error">Please choose a user</span>
          )}

        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={preparedTodos} />
    </div>
  );
};
