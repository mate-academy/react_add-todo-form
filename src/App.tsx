import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todos } from './types';
import { TodoList } from './components/TodoList';

function findUserById(userId: number) {
  return usersFromServer.find(({ id }) => id === userId) || null;
}

const preparedTodos: Todos[] = todosFromServer.map(todo => ({
  ...todo,
  user: findUserById(todo.userId),
}
));

export const App = () => {
  const [titleTodo, setTitleTodo] = useState('');
  const [userId, setUserId] = useState(0);
  const [todos, setTodos] = useState<Todos[]>(preparedTodos);
  const [isTitleError, setTitleError] = useState(false);
  const [isUserIdError, setUserIdError] = useState(false);

  const resetForm = () => {
    setTitleTodo('');
    setUserId(0);
  };

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitleTodo(event.target.value);

    if (isTitleError) {
      setTitleError(false);
    }
  }

  function handleUserSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    setUserId(+event.target.value);

    if (isUserIdError) {
      setUserIdError(false);
    }
  }

  function handleButtonAdd(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!titleTodo || !userId) {
      setTitleError(!titleTodo);
      setUserIdError(!userId);

      return;
    }

    const user = findUserById(userId);

    const todosId = todos.map(({ id }) => id);
    const maxTodoId = Math.max(...todosId);

    const newTodo = {
      id: maxTodoId + 1,
      title: titleTodo,
      completed: false,
      userId,
      user,
    };

    setTodos((prevState) => [...prevState, newTodo]);

    resetForm();
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleButtonAdd}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={titleTodo}
            onChange={handleInputChange}
            placeholder="enter a title"
          />

          {isTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUserSelect}
          >
            <option value="0" disabled>
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

          {isUserIdError && (
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
