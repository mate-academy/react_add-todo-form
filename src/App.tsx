import './App.scss';

import { ChangeEvent, FormEvent, useState } from 'react';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import { TodoWithUser, User } from './types';

const DEFAULT_USER_ID = '0';

const preparedTodos: TodoWithUser[] = todosFromServer.reduce<TodoWithUser[]>(
  (result, todo) => {
    const user = usersFromServer.find(
      currentUser => currentUser.id === todo.userId,
    );

    if (!user) {
      return result;
    }

    result.push({
      ...todo,
      user,
    });

    return result;
  },
  [],
);

function createTodo(
  todos: TodoWithUser[],
  title: string,
  user: User,
): TodoWithUser {
  const maxTodoId = Math.max(...todos.map(todo => todo.id));

  return {
    id: maxTodoId + 1,
    title,
    completed: false,
    userId: user.id,
    user,
  };
}

export const App = () => {
  const [todos, setTodos] = useState(preparedTodos);
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(DEFAULT_USER_ID);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedTitle = title.trim();
    const isTitleValid = normalizedTitle.length > 0;
    const isUserValid = selectedUserId !== DEFAULT_USER_ID;

    setHasTitleError(!isTitleValid);
    setHasUserError(!isUserValid);

    if (!isTitleValid || !isUserValid) {
      return;
    }

    const selectedUser = usersFromServer.find(currentUser => {
      return currentUser.id === Number(selectedUserId);
    });

    if (!selectedUser) {
      setHasUserError(true);

      return;
    }

    setTodos(currentTodos => {
      const nextTodo = createTodo(currentTodos, normalizedTitle, selectedUser);

      return [...currentTodos, nextTodo];
    });
    setTitle('');
    setSelectedUserId(DEFAULT_USER_ID);
    setHasTitleError(false);
    setHasUserError(false);
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);

    if (hasTitleError) {
      setHasTitleError(false);
    }
  };

  const handleUserChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(event.target.value);

    if (hasUserError) {
      setHasUserError(false);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="todo-title">Title</label>

          <input
            id="todo-title"
            type="text"
            placeholder="Enter a title"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
          />

          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="todo-user">User</label>

          <select
            id="todo-user"
            data-cy="userSelect"
            value={selectedUserId}
            onChange={handleUserChange}
          >
            <option value={DEFAULT_USER_ID}>Choose a user</option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
