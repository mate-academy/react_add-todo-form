import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo, FormErrorMessages } from './types';
import { useState } from 'react';
import { TodoList } from './components/TodoList';

function getTodos(): Todo[] {
  return todosFromServer.map(todo => {
    const user = usersFromServer.find(
      currentUser => currentUser.id === todo.userId,
    );

    return {
      ...todo,
      user: user,
    };
  });
}

function getUsers(userId: number) {
  return usersFromServer.find(user => user.id === userId);
}

function getNewTodoId(): number {
  const lastTodo = todosFromServer.length
    ? Math.max(...todosFromServer.map(todo => todo.id))
    : 1;

  return lastTodo + 1;
}

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(getTodos());
  const [title, setTitle] = useState<string>('');
  const [userId, setUserId] = useState<number>(0);
  const [error, setError] = useState<FormErrorMessages>({});

  function AddTodo(newTodo: Todo) {
    setTodos([...todos, newTodo]);
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newError: FormErrorMessages = {};

    if (!title.trim()) {
      newError.titleError = 'Title is required';
    }

    if (userId === 0) {
      newError.userError = 'Please select a user';
    }

    setError(newError);

    if (Object.keys(newError).length > 0) {
      return;
    }

    const selectedUser = getUsers(userId);

    const newTodo: Todo = {
      id: getNewTodoId(),
      title: title,
      completed: false,
      userId: userId,
      user: selectedUser,
    };

    AddTodo(newTodo);

    setTitle('');
    setUserId(0);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={onSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title</label>
          <input
            id="titleInput"
            type="text"
            placeholder="Enter a title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            data-cy="titleInput"
          />
          {error.titleError && (
            <span className="error">{error.titleError}</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User</label>
          <select
            id="userSelect"
            value={userId}
            onChange={e => setUserId(Number(e.target.value))}
            data-cy="userSelect"
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {error.userError && <span className="error">{error.userError}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
