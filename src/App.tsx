import './App.scss';

import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoWithUser } from './types/Todo';
import { TodoList } from './components/TodoList';

const preperedTodos: TodoWithUser[] = todosFromServer.map(todo => {
  const user = usersFromServer.find(({ id }) => id === todo.userId);

  return {
    ...todo,
    user,
  };
});

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserIdError, setHasUserIdError] = useState(false);
  const [todos, setTodos] = useState(preperedTodos);

  function handleTitleInput(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  function handleSelectUserId(event:React.ChangeEvent<HTMLSelectElement>) {
    setUserId(+event.target.value);
  }

  function handleOnAdd(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const user = usersFromServer.find(({ id }) => id === userId);
    const todoIds = todos.map(({ id }) => id);
    const maxTodoId = Math.max(...todoIds);

    const newTodo = {
      id: maxTodoId + 1,
      completed: false,
      title,
      userId,
      user,
    };

    setHasTitleError(!title);
    setHasUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    setTodos(currentTodos => [...currentTodos, newTodo]);
    setTitle('');
    setUserId(0);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleOnAdd}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleInput}
          />
          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            id="user"
            data-cy="userSelect"
            value={userId}
            onChange={handleSelectUserId}
          >
            <option
              value="0"
              disabled
            >
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          {hasUserIdError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
