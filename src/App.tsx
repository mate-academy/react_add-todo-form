/* eslint-disable @typescript-eslint/no-shadow */
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { useState } from 'react';

function getUserById(userId: number): User | undefined {
  return usersFromServer.find(user => user.id === userId);
}

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function getNewTodoId(todos: Todo[]) {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}

const regex = /^[a-zA-Zа-яА-ЯіІїЇєЄ0-9\s]+$/;

export const App = () => {
  const [title, setTitle] = useState('');
  const [titleErrorMessage, setTitleErrorMessage] = useState('');

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const reset = () => {
    setTitle('');
    setTitleErrorMessage('');
    setUserId(0);
    setHasUserIdError(false);
  };

  const addTodo = ({ id, ...data }: Todo) => {
    const newTodo = {
      id: getNewTodoId(todos),
      ...data,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleErrorMessage('');
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) {
      setTitleErrorMessage('Please enter a title');
    } else if (!regex.test(title)) {
      setTitleErrorMessage('Title should not contain special characters');
    }

    setHasUserIdError(!userId);

    if (!title || !userId || !regex.test(title)) {
      return;
    }

    const newTodo: Todo = {
      id: getNewTodoId(todos),
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    };

    addTodo(newTodo);

    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title:&nbsp;</label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
          {titleErrorMessage && (
            <span className="error">{titleErrorMessage}</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="title">User:&nbsp;</label>
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUserIdChange}
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

          {hasUserIdError && (
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
