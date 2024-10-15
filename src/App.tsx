/* eslint-disable @typescript-eslint/no-shadow */
import { FormEvent, useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types/Todo';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const todosWithUsers = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosWithUsers);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasError, setHasError] = useState({
    title: false,
    userId: false,
  });

  const maxId = Math.max(...todos.map(todo => todo.id)) + 1;

  const handleTitle = (event: FormEvent) => {
    const target = event.target as HTMLInputElement;

    setTitle(target.value);
    setHasError(prev => ({
      ...prev,
      title: false,
    }));
  };

  const handleUserId = (event: FormEvent) => {
    const target = event.target as HTMLSelectElement;

    setUserId(+target.value);
    setHasError(prev => ({
      ...prev,
      userId: false,
    }));
  };

  const addNewTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      setHasError(prev => ({
        ...prev,
        title: true,
      }));
    }

    if (!userId) {
      setHasError(prev => ({
        ...prev,
        userId: true,
      }));
    }

    if (!title || !userId) {
      return;
    }

    const newTodo: Todo = {
      id: maxId,
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    };

    setTodos(prev => [...prev, newTodo]);
    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={addNewTodo}>
        <div className="field">
          <label htmlFor="title">Enter Title</label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            name="title"
            value={title}
            onChange={handleTitle}
            placeholder="Enter Title"
          />
          {hasError.title && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            name="userId"
            defaultValue={0}
            value={userId}
            onChange={handleUserId}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.name}>
                {user.name}
              </option>
            ))}
          </select>

          {hasError.userId && (
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
