import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { TodoWithUser } from './react-app-env';

const getCorrectId = (todos: TodoWithUser[]) => {
  return Math.max(...todos.map(todo => todo.id)) + 1;
};

const getUserById = (userId: number) => {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
};

const todosWithUser: TodoWithUser[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoWithUser[]>(todosWithUser);
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [todoUserId, setTodoUserId] = useState(0);
  const [userIdError, setUserIdError] = useState(false);

  const resetForm = () => {
    setTitle('');
    setTodoUserId(0);
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTodoUserId(+event.target.value);
    setUserIdError(false);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimTitle = title.trim();

    setTitleError(!trimTitle);
    setUserIdError(!todoUserId);

    if (!trimTitle || !todoUserId) {
      return;
    }

    const newTodo = {
      id: getCorrectId(todos),
      title,
      userId: todoUserId,
      completed: false,
      user: getUserById(todoUserId),
    };

    if (!titleError && !userIdError) {
      setTodos(currentTodos => [...currentTodos, newTodo]);
    }

    resetForm();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleFormSubmit}
      >
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              name="title"
              value={title}
              onChange={handleInput}
              placeholder="Enter a title"
            />
            {titleError
              && <span className="error">Please enter a title</span>}
          </label>
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              name="todoUserId"
              value={todoUserId}
              onChange={handleSelect}
            >
              <option value="0" disabled>
                Choose a user
              </option>

              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>

            {userIdError
              && <span className="error">Please choose a user</span>}
          </label>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
