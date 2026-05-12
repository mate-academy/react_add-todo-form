import './App.scss';

import usersFromServer, { User } from './api/users';
import todosFromServer, { Todo } from './api/todos';
import { useState } from 'react';
import { TodoList } from './components/TodoList';

export type TodoWithUser = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User | null;
};

function getTodosWithUsers(todos: Todo[], users: User[]): TodoWithUser[] {
  return todos.map(todo => {
    const currentUser = users.find(user => todo.userId === user.id);

    return {
      ...todo,
      user: currentUser || null,
    };
  });
}

export const App = () => {
  const preparedTodos = getTodosWithUsers(todosFromServer, usersFromServer);
  const [todos, setTodos] = useState(preparedTodos);

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let hasError = false;

    if (title.trim() === '') {
      setHasTitleError(true);
      hasError = true;
    }

    if (userId === 0) {
      setHasUserError(true);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const todoIds = todos.map(todo => todo.id);
    const foundUser = usersFromServer.find(user => userId === user.id) || null;

    const newTodo: TodoWithUser = {
      id: todos.length > 0 ? Math.max(...todoIds) + 1 : 1,
      title: title,
      completed: false,
      userId: userId,
      user: foundUser,
    };

    setTodos([...todos, newTodo]);

    setTitle('');
    setUserId(0);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <span>Title: </span>
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={event => {
              const clearedTitle = event.target.value.replace(
                /[^a-zа-я0-9\s]/gi,
                '',
              );

              setTitle(clearedTitle);
              setHasTitleError(false);
            }}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <span>User: </span>
          <select
            data-cy="userSelect"
            value={userId}
            onChange={event => {
              setUserId(Number(event.target.value));
              setHasUserError(false);
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => {
              return (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              );
            })}
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
