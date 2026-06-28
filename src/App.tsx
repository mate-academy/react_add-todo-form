import { useState } from 'react';
import type { FormEvent } from 'react';

import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { TodoForm } from './components/TodoForm';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type Todo = {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
  user: User;
};

const preparedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId) as User,
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(preparedTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [isTitleError, setIsTitleError] = useState(false);
  const [isUserError, setIsUserError] = useState(false);

  const handleTitleChange = (value: string) => {
    setTitle(value.replace(/[^a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ0-9 ]/g, ''));
    setIsTitleError(false);
  };

  const handleUserChange = (value: string) => {
    setUserId(+value);
    setIsUserError(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const hasTitleError = !trimmedTitle;
    const hasUserError = userId === 0;

    setIsTitleError(hasTitleError);
    setIsUserError(hasUserError);

    if (hasTitleError || hasUserError) {
      return;
    }

    const selectedUser = usersFromServer.find(user => user.id === userId) as User;
    const nextId = Math.max(...todos.map(todo => todo.id), 0) + 1;

    const newTodo: Todo = {
      id: nextId,
      title: trimmedTitle,
      userId,
      completed: false,
      user: selectedUser,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
    setTitle('');
    setUserId(0);
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
            onChange={event => handleTitleChange(event.target.value)}
          />
          {isTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="todo-user">User</label>
          <select
            id="todo-user"
            data-cy="userSelect"
            value={userId}
            onChange={event => handleUserChange(event.target.value)}
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

          {isUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
