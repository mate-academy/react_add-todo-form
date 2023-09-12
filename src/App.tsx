import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoWithUser } from './types/Todo';
import { TodoList } from './components/TodoList';
import { User } from './types/User';

function getUserById(userId: number): User | null {
  return usersFromServer.find(({ id }) => id === userId) || null;
}

const preparedTodos: TodoWithUser[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todoTitle, setTodoTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [todos, setTodos] = useState(preparedTodos);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const resetForm = () => {
    setTodoTitle('');
    setUserId(0);
  };

  const addNewTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!todoTitle || !userId) {
      setHasTitleError(!todoTitle);
      setHasUserIdError(!userId);

      return;
    }

    const getNewTodoId = () => {
      const todoIds = todos.map(({ id }) => id);

      return Math.max(...todoIds) + 1;
    };

    const newTodo = {
      id: getNewTodoId(),
      title: todoTitle,
      userId,
      completed: false,
      user: getUserById(userId),
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);

    resetForm();
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setHasUserIdError(false);
    setUserId(+event.target.value);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHasTitleError(false);
    setTodoTitle(event.target.value);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={addNewTodo}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={todoTitle}
            onChange={handleTitleChange}
          />
          {hasTitleError
            && (<span className="error">Please enter a title</span>)}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleSelectChange}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {hasUserIdError
            && (<span className="error">Please choose a user</span>)}
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
