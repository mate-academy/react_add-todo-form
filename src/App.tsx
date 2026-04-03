import './App.scss';

import { TodoList } from './components/TodoList/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { Todo, User } from './types/types';

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [users] = useState<User[]>(usersFromServer);
  const [todos, setTodos] = useState<Todo[]>(
    todosFromServer.map(todo => ({
      ...todo,
      user: usersFromServer.find(user => user.id === todo.userId)!,
    })),
  );
  const [errorStatusTitle, setErrorStatusTitle] = useState(false);
  const [errorStatusUserId, setErrorStatusUserId] = useState(false);

  const isTitleValid = title.trim() !== '';
  const isUserIdValid = userId !== 0;

  function createChangeHandler<V>(
    setValue: React.Dispatch<React.SetStateAction<V>>,
    setError?: React.Dispatch<React.SetStateAction<boolean>>,
    transform?: (value: string) => V,
  ) {
    return (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const rawValue = event.target.value;
      const value = transform
        ? transform(rawValue)
        : (rawValue as unknown as V);

      setValue(value);
      setError?.(false);
    };
  }

  function isFormInvalid() {
    const isTitleInvalid = !isTitleValid;
    const isUserIdInvalid = !isUserIdValid;

    setErrorStatusTitle(isTitleInvalid);
    setErrorStatusUserId(isUserIdInvalid);

    return isTitleInvalid || isUserIdInvalid;
  }

  const handleAddTodo = (todo: Todo) => {
    setTodos([...todos, todo]);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isFormInvalid()) {
      return;
    }

    const newTodo: Todo = {
      id: todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1,
      title,
      completed: false,
      userId,
      user: users.find(user => user.id === userId)!,
    };

    handleAddTodo(newTodo);
    setErrorStatusUserId(false);
    setErrorStatusTitle(false);
    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label>
            Title:
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={createChangeHandler(setTitle, setErrorStatusTitle)}
            />
            {errorStatusTitle && (
              <span className="error">Please enter a title</span>
            )}
          </label>
        </div>

        <div className="field">
          <label>
            User:
            <select
              data-cy="userSelect"
              value={userId}
              onChange={createChangeHandler(
                setUserId,
                setErrorStatusUserId,
                v => +v,
              )}
            >
              <option value="0" disabled>
                Choose a user
              </option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {errorStatusUserId && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={todos} />
      </section>
    </div>
  );
};
