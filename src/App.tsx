import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todo } from './types/Todo';

const getUser = (userId: number): User | null => usersFromServer
  .find(user => user.id === userId) || null;

const visibleTodos: Todo[] = todosFromServer
  .map(todo => ({
    ...todo,
    user: getUser(todo.userId),
  }));
const todosId = visibleTodos
  .map(todo => todo.id);
let maxTodoId = Math.max(...todosId);

export function App() {
  const [userId, setUserId] = useState(0);
  const [isCorrectUser, setIsCorrectUser] = useState(true);
  const [title, setTitle] = useState('');
  const [isCorrectTitle, setIsCorrectTitle] = useState(true);

  const getTodo = (): void => {
    maxTodoId += 1;

    const newTodo: Todo = {
      id: maxTodoId,
      title,
      completed: false,
      userId,
      user: getUser(userId),
    };

    visibleTodos.push(newTodo);
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsCorrectTitle(true);
  };

  const handleChangeUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
    setIsCorrectUser(true);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!userId) {
      setIsCorrectUser(false);
    }

    if (!title.trim()) {
      setIsCorrectTitle(false);
    }

    if (!userId || !title.trim()) {
      return;
    }

    getTodo();

    setUserId(0);
    setTitle('');
    setIsCorrectTitle(true);
    setIsCorrectUser(true);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label>
            <span>{'Title: '}</span>
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleChangeTitle}
            />
            {isCorrectTitle || (
              <span className="error">Please enter a title</span>
            )}
          </label>
        </div>

        <div className="field">
          <label>
            <span>{'User: '}</span>
            <select
              data-cy="userSelect"
              defaultValue={userId}
              value={userId}
              onChange={handleChangeUser}
            >
              <option value="0" disabled>Choose a user</option>

              {usersFromServer.map(({ name, id }) => (
                <option value={id} key={id}>{name}</option>
              ))}
            </select>
          </label>

          {isCorrectUser || <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
}
